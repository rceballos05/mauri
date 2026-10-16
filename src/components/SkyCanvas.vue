<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'

const canvas = ref(null)
let raf = 0
let onResize

onMounted(() => {
  const c = canvas.value
  const ctx = c.getContext('2d')
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  let w = 0, hh = 0, stars = [], motes = []

  function size() {
    const dpr = Math.min(window.devicePixelRatio || 1, 2)
    w = window.innerWidth; hh = window.innerHeight
    c.width = w * dpr; c.height = hh * dpr
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    const n = Math.min(220, Math.round(w * hh / 9000))
    stars = Array.from({ length: n }, () => ({
      x: Math.random() * w, y: Math.random() * hh, r: Math.random() * 1.1 + .25,
      p: Math.random() * 6.28, s: Math.random() * .0016 + .0006, gold: Math.random() < .25
    }))
    motes = Array.from({ length: Math.min(40, Math.round(w / 40)) }, () => ({
      x: Math.random() * w, y: Math.random() * hh, r: Math.random() * 1.6 + .8,
      v: Math.random() * .22 + .07, d: Math.random() * 6.28
    }))
  }

  function draw(t) {
    ctx.clearRect(0, 0, w, hh)
    stars.forEach((s) => {
      const al = reduce ? .5 : .28 + .5 * (.5 + .5 * Math.sin(t * s.s * 6 + s.p))
      ctx.fillStyle = s.gold ? 'rgba(243,207,122,' + al + ')' : 'rgba(214,224,255,' + al + ')'
      ctx.beginPath(); ctx.arc(s.x, s.y, s.r, 0, 6.2832); ctx.fill()
    })
    motes.forEach((m) => {
      if (!reduce) {
        m.y -= m.v; m.x += Math.sin(t * .0006 + m.d) * .18
        if (m.y < -6) { m.y = hh + 6; m.x = Math.random() * w }
      }
      ctx.fillStyle = 'rgba(243,207,122,.10)'
      ctx.beginPath(); ctx.arc(m.x, m.y, m.r * 3.2, 0, 6.2832); ctx.fill()
      ctx.fillStyle = 'rgba(255,226,150,.7)'
      ctx.beginPath(); ctx.arc(m.x, m.y, m.r * .8, 0, 6.2832); ctx.fill()
    })
  }

  function loop(t) { draw(t); raf = requestAnimationFrame(loop) }

  size()
  onResize = () => { size(); if (reduce) draw(0) }
  window.addEventListener('resize', onResize)
  if (reduce) draw(0); else raf = requestAnimationFrame(loop)
})

onBeforeUnmount(() => {
  cancelAnimationFrame(raf)
  if (onResize) window.removeEventListener('resize', onResize)
})
</script>

<template>
  <canvas id="sky" ref="canvas" aria-hidden="true"></canvas>
</template>
