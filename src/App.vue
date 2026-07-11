<template>
  <div class="app-layout" :class="`theme-${themeStore.currentTheme}`">
    <!-- 警务系统顶栏（仅 police-blue 主题显示） -->
    <div class="police-header">
      <div class="police-header-left">
        <span class="police-badge">&#9733;</span>
        <span class="police-title">燕城市公安局案件管理系统</span>
      </div>
      <div class="police-header-right">
        <span class="police-user">&#9673; 管理员</span>
      </div>
    </div>

    <div class="app-body-wrap">
    <aside class="sidebar">
      <div class="sidebar-header">
        <div class="logo">
          <span class="logo-icon">&#9670;</span>
          <span class="logo-text">默读案卷</span>
        </div>
        <div class="logo-subtitle">MUDU DOSSIER</div>
      </div>

      <el-menu
        :default-active="activeMenu"
        :router="true"
        class="sidebar-menu"
      >
        <el-menu-item index="/">
          <span class="menu-icon">&#9632;</span>
          <span>总览</span>
        </el-menu-item>
        <el-menu-item index="/cases">
          <span class="menu-icon">&#9744;</span>
          <span>案件列表</span>
        </el-menu-item>
        <el-menu-item index="/characters">
          <span class="menu-icon">&#9673;</span>
          <span>人物档案</span>
        </el-menu-item>
        <el-menu-item index="/timeline">
          <span class="menu-icon">&#9719;</span>
          <span>时间线</span>
        </el-menu-item>
        <el-menu-item index="/challenge">
          <span class="menu-icon">&#9733;</span>
          <span>案件闯关</span>
        </el-menu-item>
      </el-menu>

      <div class="sidebar-footer">
        <div class="classified-stamp">机密</div>
      </div>
    </aside>

    <main class="main-content">
      <ThemeSwitcher />
      <router-view v-slot="{ Component }">
        <transition name="fade" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
    </main>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import ThemeSwitcher from '@/components/ThemeSwitcher.vue'
import { useThemeStore } from '@/stores/themeStore'

const route = useRoute()
const themeStore = useThemeStore()

const activeMenu = computed(() => {
  if (route.path.startsWith('/cases')) return '/cases'
  if (route.path.startsWith('/challenge')) return '/challenge'
  return route.path
})
</script>

<style lang="scss" scoped>
.app-layout {
  display: flex;
  flex-direction: column;
  height: 100vh;
  overflow: hidden;
}

.app-layout > :deep(.app-body-wrap) {
  display: flex;
  flex: 1;
  overflow: hidden;
}

/* 警务系统顶栏 — 默认隐藏 */
.police-header {
  display: none;
  align-items: center;
  justify-content: space-between;
  height: 48px;
  padding: 0 20px;
  background: linear-gradient(135deg, #0d2137 0%, #1a3a5c 50%, #0d2137 100%);
  border-bottom: 2px solid #c5a44e;
  color: #e8edf2;
  flex-shrink: 0;
}

/* 仅 police-blue 主题显示 */
.theme-police-blue .police-header {
  display: flex;
}

.police-badge {
  font-size: 20px;
  color: #c5a44e;
  margin-right: 10px;
}

.police-title {
  font-size: 16px;
  font-weight: 700;
  letter-spacing: 3px;
  color: #e8edf2;
}

.police-header-right {
  font-size: 13px;
  color: #a0b4cc;
}

.police-user {
  opacity: 0.8;
}

/* 主体区域 */
.app-body-wrap {
  display: flex;
  flex: 1;
  overflow: hidden;
}

.sidebar {
  width: var(--sidebar-w, 220px);
  min-width: var(--sidebar-w, 220px);
  background: var(--sidebar-bg);
  border-right: 1px solid var(--sidebar-border);
  display: flex;
  flex-direction: column;
  position: relative;
  transition: background-color 0.3s ease;
  animation: sidebarEnter 0.4s ease;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: var(--sidebar-deco-height, 2px);
    background: var(--sidebar-deco);
    z-index: 1;
  }

  &::after {
    content: '';
    position: absolute;
    right: 0;
    top: 0;
    bottom: 0;
    width: 1px;
    background: linear-gradient(to bottom, transparent, color-mix(in srgb, var(--accent-red) 15%, transparent), transparent);
  }
}

@keyframes sidebarEnter {
  from { opacity: 0; transform: translateX(-8px); }
  to { opacity: 1; transform: translateX(0); }
}

.sidebar-header {
  padding: 24px 20px 16px;
  border-bottom: 1px solid var(--sidebar-border);
}

.logo {
  display: flex;
  align-items: center;
  gap: 10px;
  overflow: hidden;
}

.logo-icon {
  font-size: 18px;
  color: var(--accent-red);
  flex-shrink: 0;
  width: 24px;
  text-align: center;
  line-height: 1;
}

.logo-text {
  font-size: 17px;
  font-weight: 700;
  color: var(--text-primary);
  letter-spacing: 2px;
  white-space: nowrap;
  flex-shrink: 0;
}

.logo-subtitle {
  font-family: var(--font-mono, monospace);
  font-size: 10px;
  color: var(--text-muted);
  letter-spacing: 3px;
  margin-top: 4px;
}

.sidebar-menu {
  flex: 1;
  border-right: none;
  padding: 12px 8px;
  background: transparent;

  :deep(.el-menu-item) {
    border-radius: 4px;
    margin-bottom: 4px;
    height: 44px;
    line-height: 44px;
    font-size: 14px;
    color: var(--text-secondary);
    transition: all 0.25s ease;
    position: relative;
    padding-left: 16px !important;

    &::before {
      content: '';
      position: absolute;
      left: 0;
      top: 50%;
      transform: translateY(-50%) scaleY(0);
      width: 3px;
      height: 20px;
      background: var(--accent-blue);
      border-radius: 0 2px 2px 0;
      transition: transform 0.25s ease;
    }

    &:hover {
      background: var(--bg-hover);
      color: var(--text-primary);
      padding-left: 20px !important;
    }

    &.is-active {
      background: color-mix(in srgb, var(--accent-blue) 10%, transparent);
      color: var(--accent-blue);
      font-weight: 500;

      &::before {
        transform: translateY(-50%) scaleY(1);
      }
    }
  }
}

/* police-blue 主题侧边栏特殊样式 */
.theme-police-blue .sidebar {
  .sidebar-header {
    border-bottom-color: rgba(255,255,255,0.08);
  }
  .logo-text { color: #e0e8f0; }
  .logo-subtitle { color: #6889a8; }
  .logo-icon { color: #c5a44e; font-size: 16px; }

  .sidebar-menu :deep(.el-menu-item) {
    color: #8aa4c0;
    &:hover { background: rgba(255,255,255,0.06); color: #c8dae8; }
    &.is-active { background: rgba(100,181,246,0.12); color: #64b5f6; }
  }

  .sidebar-footer { border-top-color: rgba(255,255,255,0.08); }
  .classified-stamp { color: #c5a44e; border-color: #c5a44e; }
}

.menu-icon {
  margin-right: 8px;
  font-size: 12px;
  opacity: 0.7;
}

.sidebar-footer {
  padding: 12px 20px;
  display: flex;
  justify-content: center;
}

.classified-stamp {
  font-family: var(--font-mono, monospace);
  font-size: 12px;
  color: var(--stamp-color, var(--accent-red));
  border: var(--stamp-border, 1px solid var(--accent-red));
  padding: 2px 12px;
  letter-spacing: 4px;
  opacity: 0.5;
  transform: rotate(var(--stamp-rotate, -2deg));
}

.main-content {
  flex: 1;
  overflow-y: auto;
  padding: 24px;
  background: var(--bg-primary);
  transition: background-color 0.3s ease;
  animation: mainEnter 0.4s ease;
}

@keyframes mainEnter {
  from { opacity: 0; }
  to { opacity: 1; }
}
</style>
