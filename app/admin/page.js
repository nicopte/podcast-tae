'use client';
import { useState, useEffect } from 'react';
import { CURSOS } from '@/lib/cursos';
export default function Admin() {
  const [items, setItems] = useState([]); const [pw, setPw] = useState(''); const [msg, setMsg] = useState('');
  const cargar = () => fetch('/api/podcasts', { cache: 'no-store' }).then((r) => r.json()).then(setItems);
  useEffect(() => { cargar(); }, []);
  async function borrar(p) {
    if (!confirm(`¿Eliminar "${p.titulo}"? No se puede deshacer.`)) return;
    const r = await fetch(`/api/podcasts/${p.id}`, { method: 'DELETE', headers: { 'x-admin-password': pw } });
    if (r.ok) { setMsg(''); cargar(); } else setMsg(r.status === 401 ? 'Contraseña incorrecta.' : 'No se pudo eliminar.');
  }
  return (<main className="narrow">
    <p className="eye">Administración</p><h1 className="h1s">Podcasts publicados</h1>
    <label className="form">Contraseña de administración<input type="password" value={pw} onChange={(e) => setPw(e.target.value)} /></label>
    {msg && <p className="err" role="alert">{msg}</p>}
    <ul className="adm">{items.map((p) => (<li key={p.id}><a href={`/podcast/${p.id}`}>{p.titulo}</a><span>{CURSOS[p.curso]}</span><button onClick={() => borrar(p)}>Eliminar</button></li>))}</ul>
  </main>);
}
