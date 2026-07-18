<script setup lang="ts">
import { useRoute, useData } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import { onMounted, watch, nextTick, provide } from 'vue'
import mediumZoom from 'medium-zoom'
import BackToTop from './backtotop.vue'

//亮暗模式过渡动画
const { isDark } = useData()

const enableTransitions = () =>
  'startViewTransition' in document &&
  window.matchMedia('(prefers-reduced-motion: no-preference)').matches

provide('toggle-appearance', async ({ clientX: x, clientY: y }: MouseEvent) => {
  if (!enableTransitions()) {
    isDark.value = !isDark.value
    return
  }

  const clipPath = [
    `circle(0px at ${x}px ${y}px)`,
    `circle(${Math.hypot(
      Math.max(x, innerWidth - x),
      Math.max(y, innerHeight - y)
    )}px at ${x}px ${y}px)`
  ]

  await document.startViewTransition(async () => {
    isDark.value = !isDark.value
    await nextTick()
  }).ready

  document.documentElement.animate(
    { clipPath: isDark.value ? clipPath.reverse() : clipPath },
    {
      //动画时间
      duration: 500,
      easing: 'ease-in',
      fill: 'forwards',
      pseudoElement: `::view-transition-${isDark.value ? 'old' : 'new'}(root)`
    }
  )
})

//图片缩放
const route = useRoute()
const initZoom = () => {
  mediumZoom('.main img', {
    background: 'var(--vp-c-bg)'
  })
}
onMounted(initZoom)
watch(() => route.path, () => initZoom())

</script>

<template>
  <DefaultTheme.Layout v-bind="$attrs">
    <!-- 在文档底部插入返回顶部按钮 -->
    <template #doc-footer-before>
      <BackToTop />
    </template>

    <!-- 透传插槽，保留扩展能力 -->
    <template #doc-top><slot name="doc-top" /></template>
    <template #doc-bottom><slot name="doc-bottom" /></template>
    <template #aside-top><slot name="aside-top" /></template>
    <template #aside-bottom><slot name="aside-bottom" /></template>
    <template #layout-top><slot name="layout-top" /></template>
    <template #layout-bottom><slot name="layout-bottom" /></template>
  </DefaultTheme.Layout>
</template>

<style>
::view-transition-old(root),
::view-transition-new(root) {
  animation: none;
  mix-blend-mode: normal;
}

::view-transition-old(root),
.dark::view-transition-new(root) {
  z-index: 1;
}

::view-transition-new(root),
.dark::view-transition-old(root) {
  z-index: 9999;
}

/* 修正因视图过渡导致的按钮图标偏移 */
.VPSwitchAppearance .check .icon {
  top: -2px;
}

/* 恢复原始开关按钮 */
/* .VPSwitchAppearance {
  width: 22px !important;
}

.VPSwitchAppearance .check {
  transform: none !important;
} */
</style>