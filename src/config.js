/* ============ EDITA AQUÍ ============
   Todo lo que cambia (videos, redes, WhatsApp) está en este archivo. */
export const CONFIG = {
  // Número con código de país, sin + ni espacios. Ejemplo Chile: "56912345678"
  whatsapp: "59899435130",

  redes: {
    tiktok:    { url: "https://www.tiktok.com/@mediumpsiquico?_r=1&_t=ZS-9AYuL5PioQn", nombre: "TikTok",    detalle: "Directos y videos" },
    instagram: { url: "", nombre: "Instagram", detalle: "Historias y avisos" },
    youtube:   { url: "https://m.youtube.com/@mauriciomv7778?si=HUoSANTbpIM-lqdc", nombre: "YouTube",   detalle: "Videos completos" }
  },

  // Pega el link de cada video de TikTok (Compartir → Copiar enlace).
  // Solo importa que el link tenga /video/NUMERO (los parámetros ?_r=1&_t=... se ignoran).
  videos: [
    { url: "https://www.tiktok.com/@mediumpsiquico/video/7684876001272499476?_r=1&_t=ZS-9AYu7HXzIbE", titulo: "¿Posesión en vivo?",       detalle: "Posesión en directo de tiktok" },
    { url: "https://www.tiktok.com/@mediumpsiquico/video/7696303748812918037?_r=1&_t=ZS-9AYu9MoHzbJ", titulo: "Merch",                    detalle: "Mensajes y señales" },
    { url: "https://www.tiktok.com/@mediumpsiquico/video/7695072272897346837?_r=1&_t=ZS-9AYu9jTvx24", titulo: "Testimonios",              detalle: "Sanación y meditación" },
    { url: "https://www.tiktok.com/@mediumpsiquico/video/7680581803756752148?_r=1&_t=ZS-9AYuZRctxsC", titulo: "¿Manifestación en vivo?",  detalle: "Señales del universo" }
  ]
}
/* ============ FIN DE LA EDICIÓN ============ */
