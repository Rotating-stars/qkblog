<script setup lang="ts">
import { computed } from 'vue'
import { withBase } from 'vitepress'
import { slugify } from '@mdit-vue/shared'

import { NavLink } from '../utils/types'

const props = defineProps<{
  noIcon?: boolean
  icon?: NavLink['icon']
  badge?: NavLink['badge']
  title?: NavLink['title']
  desc?: NavLink['desc']
  link: NavLink['link']
}>()

const formatTitle = computed(() => {
  if (!props.title) {
    return ''
  }
  return slugify(props.title)
})

const svg = computed(() => {
  if (typeof props.icon === 'object') return props.icon.svg
  return ''
})

const formatBadge = computed(() => {
  if (typeof props.badge === 'string') {
    return { text: props.badge, type: 'info' }
  }
  return props.badge
})
</script>

<template>
  <a v-if="link" class="m-nav-link" :href="link" target="_blank" rel="noreferrer">
    <article class="box" :class="{ 'has-badge': formatBadge }">
      <div class="box-header">
        <template v-if="!noIcon">
          <div v-if="svg" class="icon" v-html="svg"></div>
          <div v-else-if="icon && typeof icon === 'string'" class="icon">
            <div class="icon-wrapper">
              <img :src="withBase(icon)" :alt="title" onerror="this.parentElement.style.display='none'" />
              <div class="icon-overlay"></div>
            </div>
          </div>
        </template>
        <h5 v-if="title" :id="formatTitle" class="title" :class="{ 'no-icon': noIcon }">
          {{ title }}
        </h5>
      </div>
      <Badge v-if="formatBadge" class="badge" :type="formatBadge.type" :text="formatBadge.text" />
      <p v-if="desc" class="desc">{{ desc }}</p>
    </article>
  </a>
</template>

<style scoped>
.m-nav-link {
  --m-nav-icon-box-size: 50px;
  --m-nav-icon-size: 45px;
  --m-nav-box-gap: 12px;

  display: block;
  border: 1px solid var(--vp-c-bg-soft);
  border-radius: 12px;
  height: 100%;
  background-color: var(--vp-c-bg-soft);
  transition: all 0.25s;
}

.m-nav-link:hover {
  box-shadow: var(--vp-shadow-2);
  border-color: var(--vp-c-brand);
  text-decoration: initial;
  background-color: var(--vp-c-bg-soft-up);
  transform: translateY(-5px);
}

.m-nav-link .box {
  display: flex;
  flex-direction: column;
  position: relative;
  padding: var(--m-nav-box-gap);
  height: 100%;
  color: var(--vp-c-text-1);
}

.m-nav-link .box .has-badge {
  padding-top: calc(var(--m-nav-box-gap) + 2px);
}

.m-nav-link .box-header {
  display: flex;
  align-items: center;
}

.m-nav-link .icon {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: calc(var(--m-nav-box-gap) - 2px);
  border-radius: 6px;
  width: var(--m-nav-icon-box-size);
  height: var(--m-nav-icon-box-size);
  font-size: var(--m-nav-icon-size);
  background-color: var(--vp-c-bg-soft-down);
  transition: background-color 0.25s;
  position: relative;
}

.m-nav-link .icon svg {
  width: var(--m-nav-icon-size);
  fill: currentColor;
}

.m-nav-link .icon-wrapper {
  position: relative;
  width: var(--m-nav-icon-size);
  height: var(--m-nav-icon-size);
  display: flex;
  justify-content: center;
  align-items: center;
}

.m-nav-link .icon-wrapper img {
  border-radius: 4px;
  width: var(--m-nav-icon-size);
  height: var(--m-nav-icon-size);
  object-fit: contain;
  pointer-events: none;
  -webkit-user-select: none;
  user-select: none;
  -webkit-touch-callout: none;
}

.m-nav-link .icon-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: transparent;
  pointer-events: auto;
  cursor: default;
  z-index: 1;
  -webkit-user-select: none;
  user-select: none;
  -webkit-touch-callout: none;
}

.m-nav-link .title {
  overflow: hidden;
  flex-grow: 1;
  white-space: nowrap;
  text-overflow: ellipsis;
  font-size: 16px;
  font-weight: 600;
}

.m-nav-link .badge {
  position: absolute;
  top: 2px;
  right: 0;
  transform: scale(0.8);
}

.m-nav-link .desc {
  overflow: hidden;
  text-overflow: ellipsis;
  flex-grow: 1;
  margin: calc(var(--m-nav-box-gap) - 2px) 0 0;
  line-height: 1.5;
  font-size: 12px;
  color: var(--vp-c-text-2);
}

@media (max-width: 960px) {
  .m-nav-link {
    --m-nav-icon-box-size: 60px;
    --m-nav-icon-size: 60px;
    --m-nav-box-gap: 15px
  }

  .m-nav-link .title {
    font-size: 16px
  }
}
</style>