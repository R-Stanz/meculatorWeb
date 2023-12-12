import { api } from '@/api'
//import { useUserStore } from '@/stores/useUserStore'

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
}

export const tableService = new TableService()
