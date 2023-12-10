import { ref, computed } from 'vue'
import { defineStore } from "pinia"

export const useUserStore = defineStore('user', () => {
  const user = {}

  const token = computed(() => user.value.jwt)

  function logout() {
    user.value = {}
  }

  return { user, token, logout }
})
