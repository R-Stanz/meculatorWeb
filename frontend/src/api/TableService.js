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

	async allMoments(page=1, pageSize=24) {
		const res = await api.get(`/moments`, {
			params: {
				'pagination[page]': page,
				'pagination[pageSize]': pageSize,
			}
		})
		return res.data
	}

	async getVector(id) {
		let res = await api.get(`/vectors/${id}`, {})
		return res.data
	}

	async getMoment(id) {
		let res = await api.get(`/moments/${id}`, {})
		return res.data
	}

	async updateVector(id, values) {
		const userStore = useUserStore()
		let body = { data : { ...values } }
		const res = await api.put(`/vectors/${id}`, body, {
			headers: {
				Authorization : `Bearer ${userStore.token}`
			}
		})
		return res.data
	}

	async updateMoment(id, values) {
		const userStore = useUserStore()
		let body = { data : { ...values } }
		const res = await api.put(`/moments/${id}`, body, {
			headers: {
				Authorization : `Bearer ${userStore.token}`
			}
		})
		return res.data
	}

	async createVector(values) {
		const userStore = useUserStore()

		let body = { data : { ...values } }

		const res = await api.post(`/vectors`, body, {
			headers : {
				Authorization : `Bearer ${userStore.token}`
			}
		})
		return res.data
	}

	async createMoment(values) {
		const userStore = useUserStore()

		let body = { data : { ...values } }

		const res = await api.post(`/moments`, body, {
			headers : {
				Authorization : `Bearer ${userStore.token}`
			}
		})
		return res.data
	}

	async delVector(id) {
		const userStore = useUserStore()

		const res = await api.delete(`/vectors/${id}`, {
			headers : {
				Authorization : `Bearer ${userStore.token}`
			}
		})

		return res.data
	}

	async delMoment(id) {
		const userStore = useUserStore()

		const res = await api.delete(`/moments/${id}`, {
			headers : {
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
