import { data, type ActionFunctionArgs } from 'react-router'
import { parseFormData, type FileUpload } from '@mjackson/form-data-parser'
import { z } from 'zod'
import { parseWithZod } from '@conform-to/zod'
import type { SubmissionResult } from '@conform-to/react'
import { requireUser } from '#app/modules/auth/auth.server'
import { createToastHeaders } from '#app/utils/toast.server'
import { db, schema } from '@company/core/src/drizzle/index'
import { eq } from 'drizzle-orm'

export class MaxPartSizeExceededError extends Error {
  constructor() {
    super('File size exceeded the maximum allowed size')
  }
}

export const ROUTE_PATH = '/resources/upload-image' as const
export const MAX_FILE_SIZE = 1024 * 1024 * 3 // 3MB

export const ImageSchema = z.object({
  imageFile: z.instanceof(File).refine((file) => file.size > 0, 'Image is required.'),
})

export async function action({ request }: ActionFunctionArgs) {
  try {
    const user = await requireUser(request)

    const formData = await parseFormData(request, async (fileUpload: FileUpload) => {
      const buffer = await fileUpload.arrayBuffer()
      if (buffer.byteLength > MAX_FILE_SIZE) {
        throw new MaxPartSizeExceededError()
      }
      return new File([buffer], fileUpload.name, {
        type: fileUpload.type,
      })
    })

    const submission = await parseWithZod(formData, {
      schema: ImageSchema.transform(async (data) => {
        return {
          image: {
            contentType: data.imageFile.type,
            blob: Buffer.from(await data.imageFile.arrayBuffer()),
          },
        }
      }),
      async: true,
    })

    if (submission.status !== 'success') {
      return data(submission.reply(), {
        status: submission.status === 'error' ? 400 : 200,
      })
    }

    const { image } = submission.value
    await db.transaction(async (tx) => {
      await tx.delete(schema.userImage).where(eq(schema.userImage.userId, user.id))
      await tx.insert(schema.userImage).values({
        userId: user.id,
        contentType: image.contentType,
        blob: image.blob,
      })
    })

    return data(submission.reply({ fieldErrors: {} }), {
      headers: await createToastHeaders({
        title: 'Success!',
        description: 'Image uploaded successfully.',
      }),
    })
  } catch (error: unknown) {
    if (error instanceof MaxPartSizeExceededError) {
      const result: SubmissionResult = {
        initialValue: {},
        status: 'error',
        error: {
          imageFile: ['Image size must be less than 3MB.'],
        },
        state: {
          validated: {
            imageFile: true,
          },
        },
      }
      return data(result, { status: 400 })
    }
    throw error
  }
}
