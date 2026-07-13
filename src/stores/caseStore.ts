import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { casesData } from '@/data/cases'
import type { Case } from '@/data/cases'
import { useChallengeStore } from './challengeStore'

export const useCaseStore = defineStore('case', () => {
  const cases = ref<Case[]>(casesData)

  // 根据闯关进度动态计算案件状态
  const effectiveCases = computed(() => {
    const challengeStore = useChallengeStore()
    return cases.value.map(c => {
      const completed = challengeStore.isCaseCompleted(c.id)
      const caseProgress = challengeStore.getCaseProgress(c.id)
      const hasProgress = caseProgress.length > 0

      let status: Case['status']
      if (completed) {
        status = 'closed'
      } else if (hasProgress) {
        status = 'investigating'
      } else {
        status = 'unsolved'
      }

      return { ...c, status }
    })
  })

  const totalCases = computed(() => effectiveCases.value.length)
  const closedCases = computed(() => effectiveCases.value.filter(c => c.status === 'closed').length)
  const investigatingCases = computed(() => effectiveCases.value.filter(c => c.status === 'investigating').length)
  const unsolvedCases = computed(() => effectiveCases.value.filter(c => c.status === 'unsolved').length)

  function getCaseById(id: string): Case | undefined {
    return effectiveCases.value.find(c => c.id === id)
  }

  function getCasesByStatus(status: Case['status']): Case[] {
    return effectiveCases.value.filter(c => c.status === status)
  }

  return {
    cases: effectiveCases,
    totalCases,
    closedCases,
    investigatingCases,
    unsolvedCases,
    getCaseById,
    getCasesByStatus,
  }
})
