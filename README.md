# Podcast TAE
1. Subí esta carpeta a un repo de GitHub e importalo en Vercel.
2. En Vercel: Storage → Create → Blob, y conectalo al proyecto (crea BLOB_READ_WRITE_TOKEN).
3. En Settings → Environment Variables agregá ADMIN_PASSWORD (la clave para eliminar podcasts en /admin).
4. Redeploy. Opcional: reemplazá public/logo.svg por tu logo (o cambiá la ruta en app/layout.js).
Local: `npm i && npx vercel env pull .env.local && npm run dev`
