import { api } from "@/api"
import { useUserStore } from "@/stores/userStore"

class AuthenticationService {
	constructor() {}

	
	async login(values) {
		const { data } = await api.post(`/auth/local`, values)

		const user = { ...data.user, jwt : data.jwt }
		user.role = await this.getRole(user)

		const userStore = useUserStore()
		userStore.user = user

		localStorage.setItem('role', user.role)
		localStorage.setItem('identifier', user.identifier)
		return user
	}

	
	async getRole(user) {
		const { data } = await api.get('/users/me', {
			headers: {
				Authorization: `Bearer ${user.jwt}`
			},
			params: {
				populate: 'role'
			}
		})

		return data.role.type
	}
}


export const authenticationService = new AuthenticationService()
