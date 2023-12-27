import { defineStore } from "pinia"
import { useVectorStore } from "@/stores/vectorStore"
import { useMomentStore } from "@/stores/momentStore"
import { isAxiosError } from "axios"

export const useTableStore = defineStore('table', {
	state: () => ({ 
		vectorStore: useVectorStore(),
		momentStore: useMomentStore(),
		show_vectors: true,
		locked: false,
		checked: [],
		modify: "",
	}),
	getters: {
		get_currentStore: (state) => {
			if (state.show_vectors) {
				return state.vectorStore
			}
			return state.momentStore
		},

		show: (state) => {
			const currentStore = state.get_currentStore
			return currentStore.table
		},

		input_info: (state) => {
			const currentStore = state.get_currentStore
			return currentStore.input_info
		},

		attributes: (state) => {
			const currentStore = state.get_currentStore
			return currentStore.attributes
		},

		labels: (state) => {
			const currentStore = state.get_currentStore
			console.log(state.locked)
			if (state.locked) {
				return currentStore.labels.filter((item) => item != "Select")
			}
			else {
				return currentStore.labels
			}
		},

		schema: (state) => { 
			let reference = "required|max:40"
			let numb = "required"
			const att_list = state.attributes
			let schema = {}
			for (const i in att_list) {
				const name = att_list[i]
				let obj = {}
				if (i%2 == 0) {
					obj = { [name] : reference }
				}
				else {
					obj = { [name] : numb }
				}
				schema = Object.assign(obj, schema)
			}
			return schema
		},

	},
	actions: {
		async loadTables() {
			try {
				await this.vectorStore.load()
				await this.momentStore.load()
			}
			catch(e) {
				this.error(e)
			}
		},

		error(e) {
			if(isAxiosError(e)) {
				//error.value = e.response?.data.error.message
			} 	
			else if(e instanceof Error) {
				//error.value = e.message
			}
		},

		toggle() {
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
			const currentStore = this.get_currentStore
			let data = currentStore.table.data
			for (const i in data) {
				if (id == data[i].id) {
					data[i].check = false
					break
				}
			}

			this.checked = this.checked.filter(item => item !== id)
		},

		check(id) {
			const index = this.checked.indexOf(id)
			if (index > -1) {
				this.checked = this.checked.filter(item => item !== id)
			}
			else {
				this.checked.push(id)
			}
		},

		create_option() {
			this.uncheck_all()
			this.locked = true
			this.modify = "create"
		},

		edit_option() {
			this.locked = true
			this.modify = "edit"
		},

		apply(values) {
			try {
				if (this.modify == "create") {
					this.create(values)
				}
				else if (this.modify == "edit"){
					this.edit(values)
				}
				this.locked = false
			}
			catch(e) {
				this.error(e)
			}
		},

		async create(values) {
			try {
				const currentStore = this.get_currentStore
				let res = await currentStore.create(values)
				res = res.data
				res = Object.assign({ check : false }, res)
				currentStore.table.data.push(res)
			}
			catch(e) {
				this.error(e)
			}
		},

		async edit(values) {
			try {
				const currentStore = this.get_currentStore
				const id = this.checked[0]
				const index = this.find_by_id(id)

				let res = await currentStore.edit(values, id)
				res = res.data

				currentStore.table.data[index] = res
			}	
			catch(e) {
				this.error(e)
			}
		},

		find_by_id(id) {
			const currentStore = this.get_currentStore
			for (let index in currentStore.table.data) {
				if (currentStore.table.data[index].id == id) {
					return index
				}
			}
		},

		async delete() {
			try {
				const currentStore = this.get_currentStore

				let count = 0
				while (this.checked.length > 0) {
					const id = this.checked[0]
					await currentStore.delete(id)
					const index = this.find_by_id(id)

					currentStore.table.data.splice(index, 1)
					this.checked.splice(0, 1)
				}
			}	
			catch(e) {
				this.error(e)
			}
		},
	}
})
