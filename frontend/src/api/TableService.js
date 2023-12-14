import { api } from '@/api'
import { useUserStore } from '@/stores/userStore'

class TableService {

	constructor() {}

	async allVectors(page=1, pageSize=24) {
		const res = await api.get(`/vectors`, {
			params: {
				'pagination[page]': page,
				'pagination[pageSize]': pageSize,
			}
		})
		return res.data
	}

	async getVector(id) {
		let res = await api.get(`/vectors/${id}`, {})
		console.log(res.data)
		return res.data
	}

	async updateVector(id, values) {
		const userStore = useUserStore()
		let body = { data : { ...values } }
		console.log(userStore)
		console.log(userStore.token)
		const res = await api.put(`/vectors/${id}`, body, {
			headers: {
				Authorization : `Bearer ${userStore.token}`
			}
		})
		return res.data
	}

	getToken() {
		const userStore = useUserStore()
		return userStore.token
	}
}

export const tableService = new TableService()
