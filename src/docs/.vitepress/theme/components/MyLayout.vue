<!-- .vitepress/theme/MyLayout.vue -->
<script setup lang="ts">
/**
 * VitePress 自定义布局组件
 * 支持暗色主题切换动画、图片缩放、自定义页面布局
 */
import { useData, useRoute } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import { nextTick, provide, computed, onMounted, watch } from 'vue'
import mediumZoom from 'medium-zoom'
import BackToTop from './backtotop.vue'

// ========== 数据 ==========
const { frontmatter, isDark } = useData()
const route = useRoute()

// ========== 工具函数 ==========
/**
 * 检查是否支持视图过渡动画
 */
const enableTransitions = () =>
  'startViewTransition' in document &&
  window.matchMedia('(prefers-reduced-motion: no-preference)').matches

// ========== 主题切换动画 ==========
/**
 * 提供主题切换函数，支持点击位置的圆形收缩动画
 * 无论亮色→暗色还是暗色→亮色，都使用收缩动画（从边缘向点击点收缩）
 */
provide('toggle-appearance', async ({ clientX: x, clientY: y }: MouseEvent) => {
  if (!enableTransitions()) {
    isDark.value = !isDark.value
    return
  }

  // 计算点击位置到屏幕四角的最大距离，作为动画半径
  const radius = Math.hypot(
    Math.max(x, window.innerWidth - x),
    Math.max(y, window.innerHeight - y)
  )

  // 启动视图过渡动画
  const transition = document.startViewTransition(async () => {
    isDark.value = !isDark.value
    await nextTick()
  })
  await transition.ready

  // 执行收缩动画：从边缘向点击点收缩
  // 亮色→暗色：旧视图（亮色）从边缘收缩到点击点
  // 暗色→亮色：旧视图（暗色）从边缘收缩到点击点
  // 统一使用收缩效果：circle(radius) → circle(0)
  const clipPathStart = `circle(${radius}px at ${x}px ${y}px)`
  const clipPathEnd = `circle(0px at ${x}px ${y}px)`

  // 对旧视图应用收缩动画（新视图直接显示在底层）
  document.documentElement.animate(
    { clipPath: [clipPathStart, clipPathEnd] },
    {
      duration: 500,
      easing: 'ease-in-out',
      fill: 'forwards',
      pseudoElement: '::view-transition-old(root)'
    }
  )
})

// ========== 图片缩放 ==========
/**
 * 初始化 medium-zoom 图片缩放功能
 * 仅对 .main 容器内的图片生效
 */
const initZoom = () => {
  mediumZoom('.main img', {
    background: 'var(--vp-c-bg)'
  })
}

onMounted(initZoom)
watch(() => route.path, () => nextTick(initZoom))

// ========== 布局计算属性 ==========
const isCustomLayout = computed(() => frontmatter.value?.layout === 'custom')
const layoutClass = computed(() => frontmatter.value?.layoutClass || '')

// ========== 提供主题状态 ==========
// 为自定义布局提供暗色模式和切换函数
provide('isDark', isDark)
provide('toggleAppearance', (event: MouseEvent) => {
  const toggleFn = window.__VP_BLOG_TOGGLE_APPEARANCE
  if (toggleFn) toggleFn(event)
})
</script>

<template>
  <!-- ============================================================ -->
  <!-- 自定义布局模式                                               -->
  <!-- 当 frontmatter.layout === 'custom' 时启用                    -->
  <!-- ============================================================ -->
  <div v-if="isCustomLayout" class="custom-layout" :class="{ dark: isDark }">
    <!-- 头部区域 -->
    <header class="custom-header">
      <div class="header-content">
        <h1>{{ frontmatter.title || '自定义页面' }}</h1>
        <p v-if="frontmatter.description" class="description">
          {{ frontmatter.description }}
        </p>
        <!-- VitePress 原生暗色切换按钮 -->
        <ClientOnly>
          <VPSwitchAppearance class="custom-dark-toggle" />
        </ClientOnly>
      </div>
    </header>

    <!-- 导航区域 - 从 frontmatter 配置 -->
    <nav v-if="frontmatter.nav" class="custom-nav">
      <a
        v-for="item in frontmatter.nav"
        :key="item.link"
        :href="item.link"
        class="nav-link"
      >
        {{ item.text }}
      </a>
    </nav>

    <!-- 主要内容 -->
    <main class="custom-main">
      <div class="content-wrapper">
        <slot />
      </div>
    </main>

    <!-- 页脚 -->
    <footer class="custom-footer">
      <div class="footer-content">
        <BackToTop />
        <div class="footer-info">
          <p>© 2026 我的自定义站点</p>
          <div class="footer-links">
            <a href="/about">关于</a>
            <a href="/contact">联系</a>
            <a href="/privacy">隐私政策</a>
          </div>
        </div>
      </div>
    </footer>
  </div>

  <!-- ============================================================ -->
  <!-- 默认布局模式（VitePress 原生布局）                           -->
  <!-- ============================================================ -->
  <DefaultTheme.Layout
    v-else
    v-bind="$attrs"
    :class="layoutClass"
  >
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

<style scoped>
/* ================================================================
   主题切换动画（View Transitions）- 统一使用收缩效果
   ================================================================ */
::view-transition-old(root),
::view-transition-new(root) {
  animation: none;
  mix-blend-mode: normal;
}

/* 旧视图（即将被替换的页面）在上层，执行收缩动画 */
::view-transition-old(root) {
  z-index: 9999;
}

/* 新视图（即将显示的页面）在底层 */
::view-transition-new(root) {
  z-index: 0;
}

/* ================================================================
   自定义布局样式
   ================================================================ */
.custom-layout {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: var(--vp-c-bg);
  color: var(--vp-c-text-1);
  transition: background-color 0.3s, color 0.3s;
}

/* ---------- 头部 ---------- */
.custom-header {
  position: relative;
  padding: 4rem 2rem;
  text-align: center;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: #fff;
}

.dark .custom-header {
  background: linear-gradient(135deg, #4a5568 0%, #2d3748 100%);
}

.header-content {
  position: relative;
  max-width: 1200px;
  margin: 0 auto;
}

.custom-header h1 {
  margin: 0 0 0.5rem;
  font-size: 3rem;
  font-weight: 700;
}

.custom-header .description {
  margin: 0;
  font-size: 1.2rem;
  opacity: 0.9;
}

/* 暗色切换按钮在自定义头部的位置 */
.custom-dark-toggle {
  position: absolute;
  top: 1rem;
  right: 1rem;
}

/* 适配暗色背景的切换按钮样式 */
.custom-dark-toggle :deep(.VPSwitchAppearance) {
  background: rgba(255, 255, 255, 0.2);
  border: 2px solid rgba(255, 255, 255, 0.3);
  backdrop-filter: blur(10px);
}
.custom-dark-toggle :deep(.VPSwitchAppearance:hover) {
  background: rgba(255, 255, 255, 0.3);
}
.custom-dark-toggle :deep(.VPSwitchAppearance .check),
.custom-dark-toggle :deep(.VPSwitchAppearance .icon) {
  color: #fff;
}

/* ---------- 导航 ---------- */
.custom-nav {
  display: flex;
  flex-wrap: wrap;
  gap: 2rem;
  justify-content: center;
  padding: 0.75rem 2rem;
  background: var(--vp-c-bg-soft);
  border-bottom: 1px solid var(--vp-c-divider);
}

.nav-link {
  padding: 0.5rem 1rem;
  font-weight: 500;
  color: var(--vp-c-text-1);
  text-decoration: none;
  border-radius: 6px;
  transition: all 0.3s;
}
.nav-link:hover {
  color: #fff;
  background: var(--vp-c-brand);
}

/* ---------- 主内容 ---------- */
.custom-main {
  flex: 1;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
}

.content-wrapper {
  padding: 2rem;
  background: var(--vp-c-bg-soft);
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
}

.dark .content-wrapper {
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2);
}

/* 内容排版优化 */
.content-wrapper :deep(h1) {
  margin-bottom: 1.5rem;
  padding-bottom: 0.5rem;
  font-size: 2.5rem;
  border-bottom: 2px solid var(--vp-c-divider);
}
.content-wrapper :deep(h2) {
  margin-top: 2rem;
  font-size: 1.8rem;
}
.content-wrapper :deep(p) {
  line-height: 1.8;
}
.content-wrapper :deep(img) {
  max-width: 100%;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}
.content-wrapper :deep(code) {
  padding: 0.2rem 0.4rem;
  font-size: 0.9em;
  background: var(--vp-c-bg-mute);
  border-radius: 4px;
}
.content-wrapper :deep(pre) {
  padding: 1rem;
  overflow-x: auto;
  background: var(--vp-c-bg-mute);
  border-radius: 8px;
}

/* ---------- 页脚 ---------- */
.custom-footer {
  margin-top: auto;
  padding: 2rem;
  background: var(--vp-c-bg-soft);
  border-top: 1px solid var(--vp-c-divider);
}

.footer-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  max-width: 1200px;
  margin: 0 auto;
}

.footer-info {
  text-align: center;
  color: var(--vp-c-text-2);
}
.footer-info p {
  margin: 0.25rem 0;
}

.footer-links {
  display: flex;
  gap: 1.5rem;
  justify-content: center;
  margin-top: 0.5rem;
}
.footer-links a {
  color: var(--vp-c-text-2);
  text-decoration: none;
  transition: color 0.3s;
}
.footer-links a:hover {
  color: var(--vp-c-brand);
}

/* ---------- 响应式 ---------- */
@media (max-width: 768px) {
  .custom-header {
    padding: 2rem 1rem;
  }
  .custom-header h1 {
    font-size: 2rem;
  }
  .custom-header .description {
    font-size: 1rem;
  }

  .custom-nav {
    gap: 1rem;
    padding: 0.5rem 1rem;
  }

  .custom-main {
    padding: 1rem;
  }
  .content-wrapper {
    padding: 1rem;
  }

  .custom-dark-toggle {
    top: 0.5rem;
    right: 0.5rem;
  }
}
</style>