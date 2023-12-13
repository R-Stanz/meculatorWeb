import { defineStore } from "pinia"

export const useUserStore = defineStore('user', {
	state: () => ({ user: {} }),
	getters: {
		token: (state) => state.user.value.jwt,
	},
	actions: {
		logout() {
			this.user.value = {}
		},
	}
})
