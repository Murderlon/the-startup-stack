import type { LoaderFunctionArgs, ActionFunctionArgs } from 'react-router'
import { useRef, useState } from 'react'
import { Form, useFetcher, useLoaderData, useActionData } from 'react-router'
import { data, redirect } from 'react-router'
import { z } from 'zod'
import { getZodConstraint, parseWithZod } from '@conform-to/zod'
import { getFormProps, getInputProps, useForm } from '@conform-to/react'
import { LucideUpload } from 'lucide-react'
import { destroySession, getSession, requireUser } from '#app/modules/auth/auth.server'
import { createToastHeaders } from '#app/utils/toast.server'
import { useDoubleCheck } from '#app/utils/hooks/use-double-check'
import { getUserImgSrc } from '#app/utils/misc'
import { ERRORS } from '#app/utils/constants/errors'
import { INTENTS } from '#app/utils/constants/misc'
import { ROUTE_PATH as HOME_PATH } from '#app/routes/_home+/_layout'
import { Input } from '#app/components/ui/input'
import { Button } from '#app/components/ui/button'
import {
  type action as uploadImageAction,
  ROUTE_PATH as UPLOAD_IMAGE_PATH,
  ImageSchema,
} from '#app/routes/resources+/upload-image'
import { ROUTE_PATH as RESET_IMAGE_PATH } from '#app/routes/resources+/reset-image'
import { db, schema } from '@company/core/src/drizzle/index'
import { eq } from 'drizzle-orm'
import { User } from '@company/core/src/user/index'

export const UsernameSchema = z.object({
  username: z
    .string()
    .min(3)
    .max(20)
    .toLowerCase()
    .trim()
    .regex(/^[a-zA-Z0-9]+$/, 'Username may only contain alphanumeric characters.'),
})

export async function loader({ request }: LoaderFunctionArgs) {
  const user = await requireUser(request)
  const image = await User.imageID(user.id)
  return { user, image }
}

export async function action({ request }: ActionFunctionArgs) {
  const user = await requireUser(request)
  const formData = await request.clone().formData()
  const intent = formData.get(INTENTS.INTENT)

  if (intent === INTENTS.USER_UPDATE_USERNAME) {
    const submission = parseWithZod(formData, { schema: UsernameSchema })
    if (submission.status !== 'success') {
      return data(submission.reply(), {
        status: submission.status === 'error' ? 400 : 200,
      })
    }

    const { username } = submission.value
    const isUsernameTaken = await User.fromUsername(username)

    if (isUsernameTaken) {
      return data(
        submission.reply({
          fieldErrors: {
            username: [ERRORS.ONBOARDING_USERNAME_ALREADY_EXISTS],
          },
        }),
      )
    }

    await User.update(user.id, { username })
    return data(submission.reply({ fieldErrors: {} }), {
      headers: await createToastHeaders({
        title: 'Success!',
        description: 'Username updated successfully.',
      }),
    })
  }

  // TODO: cancel Stripe subscription
  if (intent === INTENTS.USER_DELETE_ACCOUNT) {
    await db.delete(schema.user).where(eq(schema.user.id, user.id))
    const session = await getSession(request.headers.get('Cookie'))
    return redirect(HOME_PATH, {
      headers: {
        'Set-Cookie': await destroySession(session),
      },
    })
  }

  throw new Error(`Invalid intent: ${intent}`)
}

export default function DashboardSettings() {
  const { user, image } = useLoaderData<typeof loader>()
  const lastResult = useActionData<typeof action>()

  const [imageSrc, setImageSrc] = useState<string | null>(null)
  const imageFormRef = useRef<HTMLFormElement>(null)
  const uploadImageFetcher = useFetcher<typeof uploadImageAction>()
  const resetImageFetcher = useFetcher()

  const { doubleCheck, getButtonProps } = useDoubleCheck()

  const [form, { username }] = useForm({
    lastResult,
    constraint: getZodConstraint(UsernameSchema),
    onValidate({ formData }) {
      return parseWithZod(formData, { schema: UsernameSchema })
    },
  })
  const [avatarForm, avatarFields] = useForm({
    lastResult: uploadImageFetcher.data,
    onValidate({ formData }) {
      return parseWithZod(formData, { schema: ImageSchema })
    },
  })

  return (
    <div className="flex h-full w-full flex-col gap-6">
      {/* Avatar */}
      <uploadImageFetcher.Form
        method="POST"
        action={UPLOAD_IMAGE_PATH}
        encType="multipart/form-data"
        ref={imageFormRef}
        onReset={() => setImageSrc(null)}
        {...getFormProps(avatarForm)}
        className="flex w-full flex-col items-start rounded-lg border border-border bg-card"
      >
        <div className="flex w-full items-start justify-between rounded-lg p-6">
          <div className="flex flex-col gap-2">
            <h2 className="text-xl font-medium text-primary">Your Avatar</h2>
            <p className="text-sm font-normal text-primary/60">
              This is your avatar. It will be displayed on your profile.
            </p>
          </div>
          <label
            htmlFor={avatarFields.imageFile.id}
            className="group relative flex cursor-pointer overflow-hidden rounded-full transition active:scale-95"
          >
            {imageSrc || image?.id ? (
              <img
                src={imageSrc ?? getUserImgSrc(image?.id)}
                className="h-20 w-20 rounded-full object-cover"
                alt={user.username ?? user.email}
              />
            ) : (
              <div className="h-20 w-20 rounded-full bg-gradient-to-br from-lime-400 from-10% via-cyan-300 to-blue-500" />
            )}
            <div className="absolute z-10 hidden h-full w-full items-center justify-center bg-primary/40 group-hover:flex">
              <LucideUpload className="h-6 w-6 text-secondary" />
            </div>
          </label>
          <input
            {...getInputProps(avatarFields.imageFile, { type: 'file' })}
            accept="image/*"
            className="peer sr-only"
            required
            tabIndex={imageSrc ? -1 : 0}
            onChange={(e) => {
              const file = e.currentTarget.files?.[0]
              if (file) {
                const form = e.currentTarget.form
                if (!form) return
                const reader = new FileReader()
                reader.onload = (readerEvent) => {
                  setImageSrc(readerEvent.target?.result?.toString() ?? null)
                  uploadImageFetcher.submit(form)
                }
                reader.readAsDataURL(file)
              }
            }}
          />
        </div>
        <div className="flex min-h-14 w-full items-center justify-between rounded-lg rounded-t-none border-t border-border bg-secondary px-6 dark:bg-card">
          <p className="text-sm font-normal text-primary/60">
            Click on the avatar to upload a custom one from your files.
          </p>
          {image?.id && !avatarFields.imageFile.errors && (
            <Button
              type="button"
              size="sm"
              variant="secondary"
              onClick={() => {
                resetImageFetcher.submit(
                  {},
                  {
                    method: 'POST',
                    action: RESET_IMAGE_PATH,
                  },
                )
                if (imageFormRef.current) {
                  imageFormRef.current.reset()
                }
              }}
            >
              Reset
            </Button>
          )}
          {avatarFields.imageFile.errors && (
            <p className="text-right text-sm text-destructive dark:text-destructive-foreground">
              {avatarFields.imageFile.errors.join(' ')}
            </p>
          )}
        </div>
      </uploadImageFetcher.Form>

      {/* Username */}
      <Form
        method="POST"
        className="flex w-full flex-col items-start rounded-lg border border-border bg-card"
        {...getFormProps(form)}
      >
        <div className="flex w-full flex-col gap-4 rounded-lg p-6">
          <div className="flex flex-col gap-2">
            <h2 className="text-xl font-medium text-primary">Your Username</h2>
            <p className="text-sm font-normal text-primary/60">
              This is your username. It will be displayed on your profile.
            </p>
          </div>
          <Input
            placeholder="Username"
            autoComplete="off"
            defaultValue={user?.username ?? ''}
            required
            className={`w-80 bg-transparent ${
              username.errors && 'border-destructive focus-visible:ring-destructive'
            }`}
            {...getInputProps(username, { type: 'text' })}
          />
          {username.errors && (
            <p className="text-sm text-destructive dark:text-destructive-foreground">
              {username.errors.join(' ')}
            </p>
          )}
        </div>
        <div className="flex min-h-14 w-full items-center justify-between rounded-lg rounded-t-none border-t border-border bg-secondary px-6 dark:bg-card">
          <p className="text-sm font-normal text-primary/60">
            Please use 32 characters at maximum.
          </p>
          <Button
            type="submit"
            size="sm"
            name={INTENTS.INTENT}
            value={INTENTS.USER_UPDATE_USERNAME}
          >
            Save
          </Button>
        </div>
      </Form>

      {/* Delete Account */}
      <div className="flex w-full flex-col items-start rounded-lg border border-destructive bg-card">
        <div className="flex flex-col gap-2 p-6">
          <h2 className="text-xl font-medium text-primary">Delete Account</h2>
          <p className="text-sm font-normal text-primary/60">
            Permanently delete your account, all of your projects, links and their
            respective stats.
          </p>
        </div>
        <div className="flex min-h-14 w-full items-center justify-between rounded-lg rounded-t-none border-t border-border bg-red-500/10 px-6 dark:bg-red-500/10">
          <p className="text-sm font-normal text-primary/60">
            This action cannot be undone, proceed with caution.
          </p>
          <Form method="POST">
            <Button
              type="submit"
              size="sm"
              variant="destructive"
              name={INTENTS.INTENT}
              value={INTENTS.USER_DELETE_ACCOUNT}
              {...getButtonProps()}
            >
              {doubleCheck ? 'Are you sure?' : 'Delete Account'}
            </Button>
          </Form>
        </div>
      </div>
    </div>
  )
}
