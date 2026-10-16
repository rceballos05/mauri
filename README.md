# Voces de Luz (Vue 3 + Vite)

Mismo diseño que el `index.html` original; solo cambia cómo se cargan los videos de TikTok
(iframe oficial `player/v1` en vez de `embed.js`).

## Editar contenido
Todo está en `src/config.js`: WhatsApp, redes y la lista de videos.
Para agregar un video, copia el enlace desde TikTok (Compartir → Copiar enlace) y añade una línea a `videos`.

## Probar en tu computador
```bash
npm install
npm run dev
```

## Publicar en Vercel
1. Sube esta carpeta (sin `node_modules` ni `dist`) a un repositorio de GitHub.
2. En Vercel: Add New → Project → elige el repositorio.
3. Vercel detecta Vite solo (Build: `npm run build`, Output: `dist`). Pulsa Deploy.
