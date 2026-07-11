import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { challengesData } from '@/data/challenges'

const STORAGE_KEY = 'mudu-challenge-progress'

interface StepResult {
  stepId: string
  correct: boolean
  answeredAt: number
}

export const useChallengeStore = defineStore('challenge', () => {
  // 从 localStorage 恢复进度
  const saved = localStorage.getItem(STORAGE_KEY)
  const progress = ref<Record<string, StepResult[]>>(saved ? JSON.parse(saved) : {})

  function saveProgress() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress.value))
  }

  function getCaseProgress(caseId: string): StepResult[] {
    return progress.value[caseId] || []
  }

  function getStepResult(caseId: string, stepId: string): StepResult | undefined {
    return getCaseProgress(caseId).find(s => s.stepId === stepId)
  }

  function recordAnswer(caseId: string, stepId: string, correct: boolean) {
    if (!progress.value[caseId]) {
      progress.value[caseId] = []
    }
    const existing = progress.value[caseId].findIndex(s => s.stepId === stepId)
    const result: StepResult = { stepId, correct, answeredAt: Date.now() }
    if (existing >= 0) {
      progress.value[caseId][existing] = result
    } else {
      progress.value[caseId].push(result)
    }
    saveProgress()
  }

  function isCaseCompleted(caseId: string): boolean {
    const challenge = challengesData.find(c => c.caseId === caseId)
    if (!challenge) return false
    const caseProgress = getCaseProgress(caseId)
    return challenge.steps.every(step =>
      caseProgress.some(s => s.stepId === step.id && s.correct)
    )
  }

  function isCaseUnlocked(caseId: string): boolean {
    const idx = challengesData.findIndex(c => c.caseId === caseId)
    if (idx <= 0) return true // 第一个案件始终解锁
    const prevCase = challengesData[idx - 1]
    return isCaseCompleted(prevCase.caseId)
  }

  function getCurrentStepIndex(caseId: string): number {
    const challenge = challengesData.find(c => c.caseId === caseId)
    if (!challenge) return 0
    const caseProgress = getCaseProgress(caseId)
    for (let i = 0; i < challenge.steps.length; i++) {
      const step = challenge.steps[i]
      const result = caseProgress.find(s => s.stepId === step.id)
      if (!result || !result.correct) return i
    }
    return challenge.steps.length // 全部完成
  }

  const totalCompleted = computed(() =>
    challengesData.filter(c => isCaseCompleted(c.caseId)).length
  )

  function resetProgress() {
    progress.value = {}
    localStorage.removeItem(STORAGE_KEY)
  }

  return {
    progress,
    getCaseProgress,
    getStepResult,
    recordAnswer,
    isCaseCompleted,
    isCaseUnlocked,
    getCurrentStepIndex,
    totalCompleted,
    resetProgress,
  }
})
