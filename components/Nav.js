'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
const L = [['/', 'Inicio'], ['/curso/5to-4ta', '5to 4ta'], ['/curso/5to-5ta', '5to 5ta']];
export default function Nav() {
  const p = usePathname();
  return (<nav aria-label="Principal">
    {L.map(([h, t]) => <Link key={h} href={h} aria-current={p === h ? 'page' : undefined}>{t}</Link>)}
    <Link className="up" href="/subir"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="M12 16V4M6 10l6-6 6 6M4 20h16" /></svg>Subir podcast</Link>
  </nav>);
}
