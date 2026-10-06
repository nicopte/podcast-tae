import Link from 'next/link';
import { notFound } from 'next/navigation';
import Card from '@/components/Card';
import { getAll, CURSOS } from '@/lib/store';
export const dynamic = 'force-dynamic';
export function generateMetadata({ params }) { return { title: `${CURSOS[params.slug] || 'Curso'} · Podcast TAE` }; }
export default async function Curso({ params }) {
  const nombre = CURSOS[params.slug];
  if (!nombre) notFound();
  const otro = Object.keys(CURSOS).find((k) => k !== params.slug);
  const items = (await getAll()).filter((p) => p.curso === params.slug);
  return (<main>
    <p className="eye">Espacio</p><h1>{nombre}</h1>
    <p className="count">{items.length} podcasts publicados</p>
    <div className="actions"><Link className="cta" href={`/subir?curso=${params.slug}`}>Subir podcast a {nombre}</Link><Link className="alt" href={`/curso/${otro}`}>Ver {CURSOS[otro]} →</Link></div>
    <div className="grid">{items.map((p) => <Card key={p.id} p={p} />)}</div>
    {!items.length && <p className="count">Todavía no hay podcasts en este curso. ¡Subí el primero!</p>}
  </main>);
}
