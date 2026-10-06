import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getOne, fecha, CURSOS } from '@/lib/store';
export const dynamic = 'force-dynamic';
export default async function Podcast({ params }) {
  const p = await getOne(params.id);
  if (!p) notFound();
  return (<main className="narrow">
    <Link className="alt" href={`/curso/${p.curso}`}>← {CURSOS[p.curso]}</Link>
    <h1 className="h1s">{p.titulo}</h1>
    <div className="meta"><span className="chip">{p.tipo === 'video' ? 'Video' : 'Audio'}</span><span>{p.duracion}</span><span>{fecha(p.fecha)}</span></div>
    {p.tipo === 'video' ? <video className="player" controls preload="metadata" poster={p.portadaUrl || undefined} src={p.audioUrl} />
      : <>{p.portadaUrl && <img className="big" src={p.portadaUrl} alt={`Portada de ${p.titulo}`} />}<audio className="player" controls preload="metadata" src={p.audioUrl} /></>}
    <p className="desc">{p.descripcion}</p>
  </main>);
}
