import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { charactersData } from '@/data/characters'
import type { Character } from '@/data/characters'

export const useCharacterStore = defineStore('character', () => {
  const characters = ref<Character[]>(charactersData)

  function getCharacterById(id: string): Character | undefined {
    return characters.value.find(c => c.id === id)
  }

  function getCharactersByRole(role: Character['role']): Character[] {
    return characters.value.filter(c => c.role === role)
  }

  const policeCount = computed(() => characters.value.filter(c => c.role === 'police').length)
  const suspectCount = computed(() => characters.value.filter(c => c.role === 'suspect').length)
  const victimCount = computed(() => characters.value.filter(c => c.role === 'victim').length)

  return {
    characters,
    getCharacterById,
    getCharactersByRole,
    policeCount,
    suspectCount,
    victimCount,
  }
})
