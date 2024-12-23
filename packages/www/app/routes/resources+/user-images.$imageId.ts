import type { LoaderFunctionArgs } from 'react-router';
import { db, schema } from '@company/core/src/drizzle/index'
import { eq } from 'drizzle-orm'

export async function loader({ params }: LoaderFunctionArgs) {
  if (!params.imageId) {
    throw new Response('Image ID is required', { status: 400 })
  }
  const image = await db.query.userImage.findFirst({
    where: eq(schema.userImage.id, params.imageId),
    columns: { contentType: true, blob: true },
  })
  if (!image) {
    throw new Response('Not found', { status: 404 })
  }

  return new Response(image.blob, {
    headers: {
      'Content-Type': image.contentType,
      'Content-Length': Buffer.byteLength(image.blob).toString(),
      'Content-Disposition': `inline; filename="${params.imageId}"`,
      'Cache-Control': 'public, max-age=31536000, immutable',
    },
  })
}
