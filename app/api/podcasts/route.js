import { NextResponse } from 'next/server';
import { getAll, save, CURSOS } from '@/lib/store';
export const dynamic = 'force-dynamic';
const okUrl = (u) => { try { return new URL(u).hostname.endsWith('.public.blob.vercel-storage.com'); } catch { return false; } };
export async function GET() { return NextResponse.json(await getAll()); }
export async function POST(req) {
  const b = await req.json();
  if (!CURSOS[b.curso] || !b.titulo?.trim() || !okUrl(b.audioUrl) || (b.portadaUrl && !okUrl(b.portadaUrl)))
    return NextResponse.json({ error: 'Datos incompletos o inválidos' }, { status: 400 });
  const p = { id: crypto.randomUUID(), titulo: b.titulo.trim().slice(0, 120), descripcion: String(b.descripcion || '').slice(0, 2000),
    curso: b.curso, tipo: b.tipo === 'video' ? 'video' : 'audio', audioUrl: b.audioUrl, portadaUrl: b.portadaUrl || '',
    duracion: String(b.duracion || '').slice(0, 10), fecha: new Date().toISOString() };
  await save(p);
  return NextResponse.json(p);
}
