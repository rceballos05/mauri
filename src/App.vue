<script setup>
import { ref, computed } from 'vue'
import { CONFIG } from './config.js'
import { ICONS } from './icons.js'
import SkyCanvas from './components/SkyCanvas.vue'
import Medallion from './components/Medallion.vue'
import TikTokPlayer from './components/TikTokPlayer.vue'

/* ---------- enlaces ---------- */
function waLink(msg = 'Hola Mauricio, vengo de tu página.') {
  const n = String(CONFIG.whatsapp || '').replace(/\D/g, '')
  return n ? 'https://wa.me/' + n + '?text=' + encodeURIComponent(msg) : ''
}
function linkAttrs(url) {
  return url ? { href: url, target: '_blank', rel: 'noopener noreferrer' } : { href: '#' }
}
function guard(e, url) {
  if (!url) e.preventDefault()
}

const tiktokUrl = CONFIG.redes.tiktok.url
const redes = Object.entries(CONFIG.redes).map(([k, r]) => ({ key: k, ...r }))

/* ---------- videos ---------- */
const videos = CONFIG.videos
const current = ref(0)
const currentUrl = computed(() => (videos[current.value] || {}).url || '')
const playerRef = ref(null)
const narrow = window.matchMedia('(max-width: 899px)')

function select(i, user) {
  current.value = i
  if (user && narrow.matches) {
    const el = playerRef.value && playerRef.value.$el
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' })
  }
}
</script>

<template>
  <SkyCanvas />

  <header class="top">
    <div class="wrap top-in">
      <a class="brand" href="#inicio">
        <span class="brand-logo" role="img" aria-label="Sello de Voces de Luz"></span>
        <span><b>VOCES DE LUZ</b><small>Mediumnidad · Sanación</small></span>
      </a>
      <nav class="nav" aria-label="Secciones">
        <a href="#videos">Videos</a>
        <a href="#redes">Redes</a>
        <a v-bind="linkAttrs(waLink())" @click="guard($event, waLink())">Contacto</a>
      </nav>
      <a class="pill-live" v-bind="linkAttrs(tiktokUrl)" @click="guard($event, tiktokUrl)"><i class="dot"></i>Directos en TikTok</a>
    </div>
  </header>

  <main>
    <section class="wrap hero" id="inicio">
      <div class="hero-copy">
        <p class="eyebrow">Mediumnidad · Mauricio · Sanación</p>
        <h1>Mauricio <span>Nicoletti</span></h1>
        <p class="lead">Conectando con tus seres queridos y guías cósmicos. ¿Vienes del directo? Escríbeme y reserva tu lectura.</p>
        <div class="cta">
          <a
            class="btn btn-wa"
            v-bind="linkAttrs(waLink('Hola Mauricio, vengo de tu directo y quiero consultar.'))"
            @click="guard($event, waLink('Hola Mauricio, vengo de tu directo y quiero consultar.'))"
          >
            <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12.031 2C6.516 2 2.022 6.494 2.022 12.009c0 1.954.563 3.782 1.536 5.334L2 22l4.82-1.517a9.96 9.96 0 005.211 1.468h.005c5.514 0 10.008-4.495 10.008-10.01 0-5.515-4.494-10.008-10.008-10.008zm5.82 14.188c-.244.686-1.42 1.31-1.958 1.393-.509.078-1.168.112-3.766-.963-3.218-1.332-5.267-4.606-5.426-4.819-.158-.214-1.303-1.733-1.303-3.305 0-1.572.825-2.345 1.117-2.664.293-.32.639-.399.852-.399.213 0 .426.002.612.012.198.01.465-.075.727.553.268.643.914 2.228.995 2.389.08.16.133.346.026.56-.107.214-.16.347-.32.534-.16.186-.336.415-.48.558-.16.16-.327.334-.14.654.186.32.826 1.364 1.77 2.204 1.215 1.082 2.24 1.417 2.56 1.577.32.16.507.133.693-.08.187-.213.799-.933 1.012-1.253.214-.32.427-.267.72-.16.294.107 1.865.88 2.185 1.04.32.16.533.24.613.373.08.134.08.773-.164 1.459z"/></svg>
            Hablar por WhatsApp
          </a>
          <a
            class="btn btn-ghost"
            v-bind="linkAttrs(waLink('Hola Mauricio, quiero agendar una sesión privada.'))"
            @click="guard($event, waLink('Hola Mauricio, quiero agendar una sesión privada.'))"
          >Agendar sesión privada</a>
        </div>
        <ul class="chips">
          <li>Sesión confidencial</li>
          <li>Por Zoom o WhatsApp</li>
          <li>Atención personalizada</li>
        </ul>
      </div>

      <Medallion />
    </section>

    <section class="wrap block" id="videos">
      <div class="sec-head">
        <h2>Videos y mensajes</h2>
        <a class="more" v-bind="linkAttrs(tiktokUrl)" @click="guard($event, tiktokUrl)">Ver todo en TikTok ↗</a>
      </div>
      <div class="stage">
        <TikTokPlayer ref="playerRef" :url="currentUrl" />
        <div class="side">
          <div class="list" id="vids">
            <button
              v-for="(v, i) in videos"
              :key="v.url"
              type="button"
              class="item"
              :style="{ '--d': (0.45 + i * 0.1) + 's' }"
              :aria-current="i === current ? 'true' : null"
              @click="select(i, true)"
            >
              <span class="item-ico"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M8 5v14l11-7z"/></svg></span>
              <span class="item-txt"><b>{{ v.titulo }}</b><small>{{ v.detalle }}</small></span>
              <span class="item-now">Viendo</span>
            </button>
          </div>
          <a
            v-show="currentUrl"
            class="popen"
            :href="currentUrl || '#'"
            target="_blank"
            rel="noopener noreferrer"
          >Abrir este video en TikTok ↗</a>
        </div>
      </div>
    </section>

    <section class="wrap block" id="redes">
      <div class="sec-head"><h2>Redes y canales</h2></div>
      <div class="socials">
        <a v-for="r in redes" :key="r.key" class="soc" v-bind="linkAttrs(r.url)" @click="guard($event, r.url)">
          <span class="soc-ico"><svg viewBox="0 0 24 24" aria-hidden="true" v-html="ICONS[r.key] || ''"></svg></span>
          <b>{{ r.nombre }}</b>
          <small>{{ r.detalle }}</small>
        </a>
      </div>
    </section>
  </main>

  <footer class="foot">
    <div class="wrap foot-in">
      <span class="sig">✦ VOCES DE LUZ · MAURICIO NICOLETTI ✦</span>
      <p>Mediumnidad, conexión espiritual y mensajes del plano celestial. Atención directa y sesiones personalizadas para todo el mundo.</p>
      <small>© 2026 Voces de Luz</small>
    </div>
  </footer>
</template>
