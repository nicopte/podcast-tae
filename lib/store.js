import { put, list, del } from '@vercel/blob';
export { CURSOS } from './cursos';
export const fecha = (f) => new Date(f).toLocaleDateString('es-AR', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'America/Argentina/Mendoza' });
export async function getAll() {
  const { blobs } = await list({ prefix: 'meta/' });
  const it = await Promise.all(blobs.map((b) => fetch(b.url, { cache: 'no-store' }).then((r) => r.json()).catch(() => null)));
  return it.filter(Boolean).sort((a, b) => b.fecha.localeCompare(a.fecha));
}
export async function getOne(id) { return (await getAll()).find((p) => p.id === id); }
export async function save(p) {
  await put(`meta/${p.id}.json`, JSON.stringify(p), { access: 'public', addRandomSuffix: false, contentType: 'application/json' });
}
export async function remove(p) {
  const { blobs } = await list({ prefix: `meta/${p.id}.json` });
  await del([...blobs.map((b) => b.url), p.audioUrl, p.portadaUrl].filter(Boolean));
}
