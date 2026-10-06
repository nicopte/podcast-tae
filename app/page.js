import Link from 'next/link';
import Card from '@/components/Card';
import { getAll } from '@/lib/store';
export const dynamic = 'force-dynamic';
export default async function Home() {
  const items = (await getAll()).slice(0, 6);
  return (<main>
    <p className="eye">Podcast TAE</p><h1>Escuchá y mirá los podcasts de TAE</h1>
    <p className="count">Elegí tu curso o subí el podcast de tu grupo.</p>
    <div className="actions"><Link className="cta" href="/curso/5to-4ta">5to 4ta</Link><Link className="cta" href="/curso/5to-5ta">5to 5ta</Link><Link className="alt" href="/subir">Subir podcast →</Link></div>
    <div className="grid">{items.map((p) => <Card key={p.id} p={p} />)}</div>
    {!items.length && <p className="count">Todavía no hay podcasts publicados.</p>}
  </main>);
}
