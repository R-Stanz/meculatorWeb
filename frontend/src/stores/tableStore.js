import { defineStore } from "pinia"
import { useVectorStore } from "@/stores/vectorStore"
import { useMomentStore } from "@/stores/momentStore"

export const useTableStore = defineStore('table', {
	state: () => ({ 
		vectorStore: useVectorStore(),
		momentStore: useMomentStore(),
		show_vectors: true,
		locked: false,
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

		toggle () {
			const currentStore = this.get_currentStore()
			currentStore.uncheck()

			this.locked = false
			this.show_vectors = !this.show_vectors
			console.log(this.show())
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
		}

	}
})
