import { NextResponse } from 'next/server';
import { getOne, remove } from '@/lib/store';
export async function DELETE(req, { params }) {
  const pw = process.env.ADMIN_PASSWORD;
  if (!pw || req.headers.get('x-admin-password') !== pw) return NextResponse.json({ error: 'No autorizado' }, { status: 401 });
  const p = await getOne(params.id);
  if (!p) return NextResponse.json({ error: 'No existe' }, { status: 404 });
  await remove(p);
  return NextResponse.json({ ok: true });
}
