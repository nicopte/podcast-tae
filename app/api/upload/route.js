import { handleUpload } from '@vercel/blob/client';
import { NextResponse } from 'next/server';
export async function POST(req) {
  const body = await req.json();
  try {
    const r = await handleUpload({
      body, request: req,
      onBeforeGenerateToken: async () => ({ allowedContentTypes: ['audio/*', 'video/*', 'image/*'], maximumSizeInBytes: 500 * 1024 * 1024, addRandomSuffix: true }),
      onUploadCompleted: async () => {},
    });
    return NextResponse.json(r);
  } catch (e) { return NextResponse.json({ error: e.message }, { status: 400 }); }
}
