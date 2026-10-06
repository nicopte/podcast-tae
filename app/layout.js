import './globals.css';
import Link from 'next/link';
import Nav from '@/components/Nav';
export const metadata = { title: 'Podcast TAE', description: 'Los podcasts de 5to 4ta y 5to 5ta de TAE. Escuchalos y miralos directamente desde la página.' };
export default function Layout({ children }) {
  return (<html lang="es"><body>
    <header><div className="bar">
      <Link className="brand" href="/"><img src="/logo.svg" alt="Logo TAE" width="46" height="60" /><span><b>Podcast TAE</b><small>TAE</small></span></Link>
      <Nav />
    </div></header>
    {children}
    <footer><div><span>© 2026 Podcast TAE · TAE</span><Link href="/subir">Subir podcast</Link><Link href="/admin">Administración</Link></div></footer>
  </body></html>);
}
