import { defineStore } from "pinia"

export const useUserStore = defineStore('user', {
	state: () => ({ user: {} }),
	getters: {
		token: (state) => state.user.jwt,
	},
	actions: {
		logout() {
			this.user = {}
		},
	}
})
