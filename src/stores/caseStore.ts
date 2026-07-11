import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { casesData } from '@/data/cases'
import type { Case } from '@/data/cases'

export const useCaseStore = defineStore('case', () => {
  const cases = ref<Case[]>(casesData)

  const totalCases = computed(() => cases.value.length)
  const closedCases = computed(() => cases.value.filter(c => c.status === 'closed').length)
  const investigatingCases = computed(() => cases.value.filter(c => c.status === 'investigating').length)
  const unsolvedCases = computed(() => cases.value.filter(c => c.status === 'unsolved').length)

  function getCaseById(id: string): Case | undefined {
    return cases.value.find(c => c.id === id)
  }

  function getCasesByStatus(status: Case['status']): Case[] {
    return cases.value.filter(c => c.status === status)
  }

  return {
    cases,
    totalCases,
    closedCases,
    investigatingCases,
    unsolvedCases,
    getCaseById,
    getCasesByStatus,
  }
})
