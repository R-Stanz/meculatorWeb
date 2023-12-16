import { api } from "@/api"
import { useUserStore } from "@/stores/userStore"

class AuthenticationService {
	constructor() {}

	async signUp(values) {
		values = Object.assign({ role : 1 }, values)
		await api.post(`/auth/local/register`, values)
	}

	async newAdmin(values) {
		values = Object.assign({ role : 3 }, values)
	}
	
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
				Authorization : `Bearer ${user.jwt}`
			},
			params: {
				populate: 'role'
			}
		})

		return data.role.type
	}

	async delAcc(values) {
		console.log("inside")
		const userStore = useUserStore()
		const res = await api.get('/users/me', {
			headers: {
				Authorization : `Bearer ${userStore.token}`
			}
		})

		const username = res.data.username
		const password = values.password

		let body = { 
			"identifier" : res.data.username, 
			"password" : values.password 
		}

		await this.login(body)

		const users = await api.get(`/users`, {
			headers: {
				Authorization : `Bearer ${userStore.token}`
			}
		})
		console.log(users)
		let id = 0
		for (let i in users.data) {
			if (values.username == users.data[i].username) {
				id = users.data[i].id
			}
		}

		await api.delete(`/users/${id}`, {
			headers: {
				Authorization : `Bearer ${userStore.token}`
			}
		})

	}
}


export const authenticationService = new AuthenticationService()
