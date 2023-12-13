import { api } from '@/api'
//import { useUserStore } from '@/stores/userStore'

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
		const res = await api.get(`/vectors/${id}`, {})
		return res.data
	}

	async updateVector(id, values) {
		const userStore = useUserStore()
		const res = await api.put(`/vectors/${id}`, values, {
			headers: {
				Authorization : `Bearer ${userStore.token}`
			}
		})
		return res.data
	}
}

export const tableService = new TableService()
