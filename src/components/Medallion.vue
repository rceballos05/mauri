<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'

/* Anillos de geometría sagrada alrededor del logo */
const R = 34
const centers = [
  [0, 0],
  ...Array.from({ length: 6 }, (_, i) => {
    const a = i * Math.PI / 3
    return [R * Math.cos(a), R * Math.sin(a)]
  }),
  ...Array.from({ length: 6 }, (_, i) => {
    const a = i * Math.PI / 3 + Math.PI / 6
    return [R * Math.sqrt(3) * Math.cos(a), R * Math.sqrt(3) * Math.sin(a)]
  })
]
const ticks = Array.from({ length: 72 }, (_, i) => {
  const a = i * Math.PI / 36
  const long = i % 6 === 0
  const r0 = 196
  const r1 = long ? 184 : 190
  return {
    x1: 200 + r0 * Math.cos(a), y1: 200 + r0 * Math.sin(a),
    x2: 200 + r1 * Math.cos(a), y2: 200 + r1 * Math.sin(a),
    op: long ? 0.6 : 0.25, sw: long ? 1.4 : 1
  }
})
const dots = Array.from({ length: 12 }, (_, j) => {
  const b = j * Math.PI / 6
  return { cx: 200 + 176 * Math.cos(b), cy: 200 + 176 * Math.sin(b) }
})

/* Inclinación suave del medallón con el puntero (solo con mouse) */
const rx = ref(0)
const ry = ref(0)
function onMove(e) {
  const x = e.clientX / window.innerWidth - 0.5
  const y = e.clientY / window.innerHeight - 0.5
  rx.value = +(-y * 9).toFixed(2)
  ry.value = +(x * 12).toFixed(2)
}
onMounted(() => {
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  if (!reduce && window.matchMedia('(hover: hover)').matches) {
    window.addEventListener('pointermove', onMove, { passive: true })
  }
})
onBeforeUnmount(() => window.removeEventListener('pointermove', onMove))
</script>

<template>
  <div class="medallion">
    <div class="med-in" :style="{ '--rx': rx + 'deg', '--ry': ry + 'deg' }">
      <svg class="ring r1" viewBox="0 0 400 400" aria-hidden="true">
        <circle cx="200" cy="200" r="196" fill="none" stroke="#d4af37" stroke-opacity=".35" stroke-width="1" />
        <circle cx="200" cy="200" r="188" fill="none" stroke="#d4af37" stroke-opacity=".18" stroke-width="1" stroke-dasharray="2 7" />
        <circle
          v-for="(p, i) in centers" :key="'c' + i"
          :cx="200 + p[0]" :cy="200 + p[1]" :r="R * 1.55"
          fill="none" stroke="#d4af37" stroke-opacity=".16" stroke-width="1"
        />
      </svg>
      <svg class="ring r2" viewBox="0 0 400 400" aria-hidden="true">
        <line
          v-for="(t, i) in ticks" :key="'t' + i"
          :x1="t.x1" :y1="t.y1" :x2="t.x2" :y2="t.y2"
          stroke="#d4af37" :stroke-opacity="t.op" :stroke-width="t.sw"
        />
        <circle
          v-for="(d, j) in dots" :key="'d' + j"
          :cx="d.cx" :cy="d.cy" r="2.6" fill="#f3cf7a" fill-opacity=".85"
        />
      </svg>
      <div class="aura"></div>
      <div class="seal" role="img" aria-label="Sello de Voces de Luz: fénix con ojo dorado sobre la flor de la vida"></div>
    </div>
  </div>
</template>
