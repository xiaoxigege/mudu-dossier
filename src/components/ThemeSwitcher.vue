<template>
  <div class="theme-float" :class="{ expanded }">
    <button class="theme-toggle" @click="expanded = !expanded" :title="'当前主题：' + currentThemeName">
      <span class="toggle-icon">{{ currentThemeIcon }}</span>
    </button>
    <transition name="dropdown">
      <div v-if="expanded" class="theme-dropdown">
        <div class="dropdown-header">选择主题</div>
        <div
          v-for="t in themeStore.themes"
          :key="t.id"
          class="theme-item"
          :class="{ active: themeStore.currentTheme === t.id }"
          @click="themeStore.setTheme(t.id)"
        >
          <span class="item-icon">{{ t.icon }}</span>
          <div class="item-info">
            <div class="item-name">{{ t.name }}</div>
            <div class="item-desc">{{ t.desc }}</div>
          </div>
          <span v-if="themeStore.currentTheme === t.id" class="item-check">&#10003;</span>
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useThemeStore } from '@/stores/themeStore'

const themeStore = useThemeStore()
const expanded = ref(false)

const currentThemeName = computed(() => {
  const t = themeStore.themes.find(t => t.id === themeStore.currentTheme)
  return t?.name ?? ''
})

const currentThemeIcon = computed(() => {
  const t = themeStore.themes.find(t => t.id === themeStore.currentTheme)
  return t?.icon ?? '&#9783;'
})
</script>

<style lang="scss" scoped>
.theme-float {
  position: fixed;
  top: 16px;
  right: 16px;
  z-index: 1000;
}

.theme-toggle {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: var(--bg-secondary);
  border: 1px solid var(--border-color);
  color: var(--text-primary);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  transition: all 0.2s ease;
  box-shadow: 0 2px 8px rgba(0,0,0,0.2);

  &:hover {
    transform: scale(1.1);
    box-shadow: 0 4px 16px rgba(0,0,0,0.3);
    border-color: var(--accent-blue);
  }
}

.toggle-icon {
  line-height: 1;
}

.theme-dropdown {
  position: absolute;
  top: 48px;
  right: 0;
  width: 240px;
  background: var(--bg-secondary);
  border: 1px solid var(--border-color);
  border-radius: 8px;
  box-shadow: 0 8px 24px rgba(0,0,0,0.3);
  overflow: hidden;
}

.dropdown-header {
  padding: 10px 14px 6px;
  font-size: 11px;
  color: var(--text-muted);
  letter-spacing: 1px;
  text-transform: uppercase;
  border-bottom: 1px solid var(--border-light);
}

.theme-item {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px 14px;
  cursor: pointer;
  transition: all 0.15s ease;
  border-bottom: 1px solid var(--border-light);

  &:last-child { border-bottom: none; }

  &:hover {
    background: var(--bg-hover);
  }

  &.active {
    background: color-mix(in srgb, var(--accent-blue) 8%, transparent);
  }
}

.item-icon {
  font-size: 18px;
  flex-shrink: 0;
}

.item-info {
  flex: 1;
  min-width: 0;
}

.item-name {
  font-size: 13px;
  font-weight: 600;
  color: var(--text-primary);
}

.item-desc {
  font-size: 11px;
  color: var(--text-muted);
  margin-top: 1px;
}

.item-check {
  color: var(--accent-green);
  font-size: 14px;
  font-weight: 700;
}

/* Dropdown transition */
.dropdown-enter-active {
  transition: all 0.2s ease-out;
}
.dropdown-leave-active {
  transition: all 0.15s ease-in;
}
.dropdown-enter-from,
.dropdown-leave-to {
  opacity: 0;
  transform: translateY(-8px);
}
</style>
