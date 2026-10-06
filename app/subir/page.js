'use client';
import { useState, useEffect } from 'react';
import { upload } from '@vercel/blob/client';
const dur = (f) => new Promise((res) => {
  const m = document.createElement(f.type.startsWith('video') ? 'video' : 'audio');
  m.preload = 'metadata';
  m.onloadedmetadata = () => { const s = Math.round(m.duration); res(isFinite(s) ? `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}` : ''); URL.revokeObjectURL(m.src); };
  m.onerror = () => res('');
  m.src = URL.createObjectURL(f);
});
export default function Subir() {
  const [curso, setCurso] = useState('5to-4ta'); const [msg, setMsg] = useState(''); const [pct, setPct] = useState(0); const [busy, setBusy] = useState(false);
  useEffect(() => { const c = new URLSearchParams(location.search).get('curso'); if (c) setCurso(c); }, []);
  async function enviar(e) {
    e.preventDefault();
    const f = new FormData(e.target); const a = f.get('archivo'); const c = f.get('portada');
    if (!a || !a.size) { setMsg('Elegí un archivo de audio o video.'); return; }
    setBusy(true); setMsg(''); setPct(0);
    try {
      const o = (prog) => ({ access: 'public', handleUploadUrl: '/api/upload', multipart: true, onUploadProgress: prog ? ({ percentage }) => setPct(Math.round(percentage)) : undefined });
      const duracion = await dur(a);
      const au = await upload(`podcasts/${a.name}`, a, o(true));
      const po = c && c.size ? await upload(`portadas/${c.name}`, c, o(false)) : null;
      const r = await fetch('/api/podcasts', { method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ titulo: f.get('titulo'), descripcion: f.get('descripcion'), curso, tipo: a.type.startsWith('video') ? 'video' : 'audio', audioUrl: au.url, portadaUrl: po?.url || '', duracion }) });
      const d = await r.json();
      if (!r.ok) throw new Error(d.error);
      location.href = `/podcast/${d.id}`;
    } catch (err) { setMsg(err.message || 'No se pudo subir el podcast.'); setBusy(false); }
  }
  return (<main className="narrow">
    <p className="eye">Nuevo</p><h1 className="h1s">Subir podcast</h1>
    <form onSubmit={enviar} className="form">
      <label>Curso<select value={curso} onChange={(e) => setCurso(e.target.value)}><option value="5to-4ta">5to 4ta</option><option value="5to-5ta">5to 5ta</option></select></label>
      <label>Título<input name="titulo" required maxLength={120} /></label>
      <label>Descripción e integrantes<textarea name="descripcion" rows={5} maxLength={2000} /></label>
      <label>Archivo de audio o video<input name="archivo" type="file" accept="audio/*,video/*" required /></label>
      <label>Portada (opcional)<input name="portada" type="file" accept="image/*" /></label>
      <button className="cta" disabled={busy}>{busy ? `Subiendo… ${pct}%` : 'Publicar podcast'}</button>
      {msg && <p className="err" role="alert">{msg}</p>}
    </form>
  </main>);
}
