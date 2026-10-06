import Link from 'next/link';
import { fecha } from '@/lib/store';
const G = ['#6a1fa8,#2a0a4a', '#1f6b4a,#0f2a1a', '#244a7a,#0f2540', '#7a3a1a,#2a1408', '#8a1f3a,#3a0a18', '#1a7a43,#0f3a22'];
export default function Card({ p }) {
  const n = [...p.id].reduce((a, c) => a + c.charCodeAt(0), 0) % G.length;
  return (<Link className="ep" href={`/podcast/${p.id}`}>
    <div className="cover" style={p.portadaUrl ? undefined : { background: `linear-gradient(135deg,${G[n]})` }}>
      {p.portadaUrl ? <img src={p.portadaUrl} alt={`Portada de ${p.titulo}`} /> : <span>{p.titulo}</span>}
      <span className="play" />
    </div>
    <div className="body">
      <div className="meta"><span className="chip">{p.tipo === 'video' ? 'Video' : 'Audio'}</span><span>{p.duracion}</span></div>
      <h2>{p.titulo}</h2><p>{p.descripcion}</p>
      <div className="foot"><span>{fecha(p.fecha)}</span><b>Escuchar →</b></div>
    </div>
  </Link>);
}
