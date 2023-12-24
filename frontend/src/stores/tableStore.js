import { defineStore } from "pinia"
import { useVectorStore } from "@/stores/vectorStore"
import { useMomentStore } from "@/stores/momentStore"

export const useTableStore = defineStore('table', {
	state: () => ({ 
		vectorStore: useVectorStore(),
		momentStore: useMomentStore(),
		show_vectors: true,
		locked: false,
		checked: [],
	}),
	getters: {
	},
	actions: {
		async loadTables() {
			try {
				await this.vectorStore.load()
				await this.momentStore.load()
			}
			catch(e) {
				console.log(e)
			}
		},

		get_currentStore() {
			if (this.show_vectors) {
				return this.vectorStore
			}
			return this.momentStore
		},

		show() {
			const currentStore = this.get_currentStore()
			return currentStore.table
		},

		toggle() {
			const currentStore = this.get_currentStore()
			currentStore.uncheck()

			this.locked = false
			this.uncheck_all()
			this.show_vectors = !this.show_vectors
		},

		uncheck_all() {
			for (const id of this.checked) {
				this.uncheck(id)
			}
		},

		uncheck(id) {
			const currentStore = this.get_currentStore()
			for (const i of currentStore.table.data) {
				if (id == i.id) {
					i.check = false
					break
				}
			}

			this.checked = this.checked.filter(item => item !== id)
		},

		modify() {
			this.locked = true
		},

		input_info() {
			const currentStore = this.get_currentStore()
			return currentStore.input_info()
		},

		attributes() {
			const currentStore = this.get_currentStore()
			return currentStore.attributes
		},

		labels() {
			const currentStore = this.get_currentStore()
			return currentStore.labels
		},

		check(id) {
			const index = this.checked.indexOf(id)
			if (index > -1) {
				this.checked = this.checked.filter(item => item !== id)
			}
			else {
				this.checked.push(id)
			}
		}

	}
})
