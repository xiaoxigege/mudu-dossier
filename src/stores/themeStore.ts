import { defineStore } from 'pinia'
import { ref, watch } from 'vue'

export type ThemeId = 'dark-crime' | 'vintage-archive' | 'police-blue' | 'dark-gothic'

export interface ThemeInfo {
  id: ThemeId
  name: string
  desc: string
  icon: string
}

export const themes: ThemeInfo[] = [
  { id: 'dark-crime', name: '暗色刑侦', desc: 'CRT扫描线 + 红色暗角，冷峻刑侦风', icon: '🔍' },
  { id: 'vintage-archive', name: '复古档案', desc: '做旧纸张纹理 + 棕色暗角，泛黄卷宗', icon: '📜' },
  { id: 'police-blue', name: '警务蓝白', desc: '网格纸纹理 + 深蓝侧栏，专业警务系统', icon: '🛡️' },
  { id: 'dark-gothic', name: '暗夜哥特', desc: '深紫暗角 + 渐变装饰，哥特悬疑氛围', icon: '🦇' },
]

const STORAGE_KEY = 'mudu-theme'

export const useThemeStore = defineStore('theme', () => {
  const saved = localStorage.getItem(STORAGE_KEY) as ThemeId | null
  const currentTheme = ref<ThemeId>(saved || 'dark-crime')

  function applyTheme(id: ThemeId) {
    document.documentElement.setAttribute('data-theme', id)
    currentTheme.value = id
    localStorage.setItem(STORAGE_KEY, id)
  }

  function setTheme(id: ThemeId) {
    applyTheme(id)
  }

  // 初始化
  applyTheme(currentTheme.value)

  // 监听变化（可选）
  watch(currentTheme, (val) => {
    document.documentElement.setAttribute('data-theme', val)
  })

  return { currentTheme, setTheme, themes }
})
