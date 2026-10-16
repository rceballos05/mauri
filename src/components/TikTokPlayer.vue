<script setup>
/*
 * Reproductor oficial de TikTok (iframe https://www.tiktok.com/player/v1/{id}).
 * No usa embed.js: ese script es lo que suelen bloquear los bloqueadores de
 * anuncios, los navegadores con privacidad reforzada y los navegadores
 * integrados de Instagram/TikTok/Facebook.
 */
import { ref, computed, watch, onMounted, onBeforeUnmount } from 'vue'

const props = defineProps({ url: { type: String, default: '' } })

const id = computed(() => (String(props.url).match(/\/video\/(\d+)/) || [])[1])
const src = computed(() => (id.value ? `https://www.tiktok.com/player/v1/${id.value}?rel=0` : ''))

const failed = ref(false)
let timer

function arm() {
  failed.value = false
  clearTimeout(timer)
  if (src.value) timer = setTimeout(() => { failed.value = true }, 9000)
}
function onLoad() {
  clearTimeout(timer)
}
function onMessage(e) {
  if (e.origin !== 'https://www.tiktok.com') return
  const d = e.data
  if (d && typeof d === 'object' && d['x-tiktok-player'] && d.type === 'onPlayerError') {
    clearTimeout(timer)
    failed.value = true
  }
}

watch(src, arm, { immediate: true })
onMounted(() => window.addEventListener('message', onMessage))
onBeforeUnmount(() => {
  clearTimeout(timer)
  window.removeEventListener('message', onMessage)
})
</script>

<template>
  <div class="player" id="player" aria-live="polite">
    <iframe
      v-if="src"
      :key="src"
      :src="src"
      title="Video de TikTok"
      allow="fullscreen"
      allowfullscreen
      @load="onLoad"
    ></iframe>
    <div v-if="failed" class="pnote">
      Si el video no aparece, <a :href="url" target="_blank" rel="noopener noreferrer">ábrelo en TikTok</a>.
    </div>
  </div>
</template>
