<template>
	<main>
		<div 
			id="panel" 
			v-if="edit_show_alert"
		> {{ edit_alert_msg }}
		</div>
		<vee-form v-if="modifying" id="form" :validation-schema="schema" @submit="apply">
			<div id="all_inputs_area">
				<div 
					class="inputs_area"
					v-for="info in input_info()" 
					:key="info.name"
				>
						<vee-field 
							:name="info.name"
							:placeholder="info.val"
							:id="info.name"
							:type="info.type"
							class="input"
						>
						</vee-field>
					<ErrorMessage class="required" :name="info.name" />
				</div>
			</div>

			<button
				type="submit"
				:disabled="edit_in_submission"
			> Apply Changes
			</button>

		</vee-form>

		<table>
			<tr>
				<td 
					v-for="label in labels"
				>
					{{ label }}
				</td>
			</tr>

			<tr
				v-for="vector in vectors"
				v-show="show_vectors"
			>
				<td v-if="!modifying">
				<input 
					type="checkbox" 
					v-model="vector.check"
					@click="$emit('select', vector.id)" 
				/></td>
				<td
					v-for="(value, index) in vector.val"
					v-bind:key="index"
				>
					{{ value[1] }}
				</td>
			</tr>

			<tr
				v-for="moment in moments"
				v-show="!show_vectors"
			>
				<td v-if="!modifying">
				<input 
					type="checkbox" 
					v-model="moment.check"
					@click="$emit('select', moment.id)" 
				/></td>
				<td
					v-for="(value, index) in moment.val"
					v-bind:key="index"
				>
					{{ value[1] }}
				</td>
			</tr>

		</table>
	</main>
</template>

<style scoped src="@/assets/css/user.css">
</style>

<script>
import { tableService } from '@/api/TableService'
import { isAxiosError } from 'axios'
import { vector_page_handler, moment_page_handler, vector_handler, new_vector_handler } from '@/includes/dataHandler'

export default {
	props: {
		show_vectors: Boolean,
		selected_list: Array,
		modifying: Boolean,
		deleting: Boolean,
	},      
	
	emits: ["selected_list", "done_modifying", "deleted", "select"],
	
	data() {
		return {
			vectors_labels: [
					"Select", "Name", "Magnitude", "Unit", "i", "Unit",
					"j", "Unit", "k", "Unit", "xy Reference", 
					"Unit", "xz Reference", "Unit", "yz Reference", "Unit"],
			moments_labels: [
					"Select", "Name", "Magnitude", "Unit", "i", "Unit",
					"j", "Unit", "k", "Unit", "xy Reference", 
					"Unit", "xz Reference", "Unit", "yz Reference", "Unit", "Is Torque"],
			labels: [
				"Select", "Name", "Magnitude", "Unit", "i", "Unit",
					"j", "Unit", "k", "Unit", "xy Reference", 
					"Unit", "xz Reference", "Unit", "yz Reference", "Unit"],

			vectors: [],
			moments: [],
			
			edit_in_submission:	false,
			edit_show_alert:	false,
			edit_alert_variant:	"info",
			edit_alert_msg:		"Loding!",
		}
	},

	methods: {
		input_info() {
			let info = []
			let stc_ent = []
			if (this.show_vectors && this.selected_list.length == 1) {
				let vector = this.find_by_id(this.selected_list[0])
				stc_ent = vector.val.map((x) => x)
			}
			else if (!this.show_vectors && this.selected_list.length == 1) {
				let moment = this.find_by_id(this.selected_list[0])
				stc_ent = moment.val.map((x) => x)
			}
			else if (this.show_vectors) {
				let vector = this.vectors[0]
				stc_ent = vector.val.map((x) => x)
			}
			else {
				let moment = this.moments[0]
				stc_ent = moment.val.map((x) => x)
			}

			for (let i in stc_ent) {
				let input_type = ""
				if (i%2 != 0) {
					input_type = "number"
				}
				else {
					input_type = "text"
				}
				info.push({name:stc_ent[i][0], val:stc_ent[i][1], type:input_type})
			}
			return info
		},

		find_by_id(id) {
			if(this.show_vectors) {
				for (let index in this.vectors) {
					if(id == this.vectors[index].id) {
						return this.vectors[index]					
					}
				}
			}
			else {
				for (let index in this.moments) {
					if(id == this.moments[index].id) {
						return this.moments[index]
					}
				}
			}
		},

		find_index_by_id(id) {
			if(this.show_vectors) {
				for (let index in this.vectors) {
					if(id == this.vectors[index].id) {
						return { index : [index], val : this.vectors[index] }
					}
				}
			}
			else {
				for (let index in this.moments) {
					if(id == this.moments[index].id) {
						return { index : [index], content : this.moments[index] }
					}
				}
			}
		},

		async apply(values) {
			this.edit_in_submission = 	true
			this.edit_show_alert = 		true
			this.edit_alert_variant = 	"info"
			this.edit_alert_msg =		"Submiting!"

			try {
				let id = 0
				if (this.show_vectors && this.selected_list.length == 1) {
					id = this.selected_list[0]
					let info = this.find_index_by_id(id)
					console.log(info)
					let index = info.index
					let vector = info.content

					await tableService.updateVector(id, values)
					let vectors = this.vectors
					let vec = await tableService.getVector(id)

					vectors[index] = vector_handler(vec)

				}
				else if (!this.show_vectors && this.selected_list.length == 1) {
					id = this.selected_list[0]
					let info = this.find_index_by_id(id)
					let index = info.index
					let moment = info.content

					await tableService.updateVector(id, values)
					let moments = this.moments
					let vec = await tableService.getVector(id)

					moments[index] = moment_handler(vec)
				}
				else if (this.show_vectors) {
					let res = await tableService.createVector(values)
					id = res.data.id
					let vector = new_vector_handler(id, values)
					this.vectors.push(vector)
				}
				else {
					let res = await tableService.createVector(values)
					id = res.data.id
					let moment = new_moment_handler(id, values)
					this.moments.push(moment)
				}

				this.edit_alert_variant = "success"
				this.edit_alert_msg = "Successfully Edited!"

				console.log("end")
				this.$emit('done_modifying', id)
			}
			catch(e) {
				this.error_msg(e)
			}
			finally {
				this.edit_in_submission = false
			}
		},

		error_msg(e) {
			this.edit_alert_variant = "error"

			if(isAxiosError(e)) {
				this.edit_alert_msg = e.response?.data.error.message
			}
			else if(e instanceof Error) {
				this.edit_alert_msg = e.message
			}
		},

		async delete() {

			this.edit_in_submission = 	true
			this.edit_show_alert = 		true
			this.edit_alert_variant = 	"info"
			this.edit_alert_msg =		"Submiting!"

			try {
				let deleted_list = []
				let count = 0
				if (this.show_vectors) {
					while (count < this.selected_list.length) {
						let id = this.selected_list[count]
						let res = await tableService.delVector(id)

						for (let i in this.vectors) {
							if (this.vectors[i].id == id) {
								this.vectors.splice(i, 1)
							}
						}

						deleted_list.push(res.data.id)
						count++
					}
				}
				else {
					while (count < this.selected_list.length) {
						let id = this.selected_list[count]
						let res = await tableService.delVector(id)

						for (let i in this.moments) {
							if (this.moments[i].id == id) {
								this.moments.splice(i, 1)
							}
						}

						deleted_list.push(res.data.id)
						count++
					}
				}
					console.log(deleted_list)
					this.$emit("deleted")
			}
			catch(e) {
				this.error_msg(e)
			}
			finally {
				this.edit_in_submission = false
			}
		}
	},
	
	computed: {
		schema() {
			let reference = "required|max:40|alpha_dash"
			let numb = "required"
			let new_schema = {}
			let stc_ent_labels = []
			if (this.show_vectors) {
				for (let i in this.vectors[0].val) {
					let name = this.vectors[0].val[i][0]
					let obj = {}
					if (i%2 == 0) {
						obj = { [name] : reference }
					}
					else {
						obj = { [name] : numb }
					}
					new_schema = Object.assign(new_schema, obj)
				}
			}
			else {
				for (let i in this.moments[0].val) {
					let name = this.moments[0].val[i][0]
					let obj = {}
					if (i%2 == 0) {
						obj = { [name] : reference }
					}
					else {
						obj = { [name] : numb }
					}
					new_schema = Object.assign(new_schema, obj)
				}
			}
			return new_schema
		}
	},
	
	async mounted() {
		this.edit_in_submission = 	true
		this.edit_show_alert =		true

		let vectors_page = []
		let moments_page = []
		try {
			vectors_page = await tableService.allVectors()
			moments_page = await tableService.allMoments()

			this.edit_alert_variant = "success"
			this.edit_alert_msg = "Pages loaded!"

			setTimeout(function () {
						this.edit_in_submission =	false
						this.edit_show_alert =		false
						this.edit_alert_variant =	"info"
						this.edit_alert_msg =		"Loding!"
			}.bind(this), 3500)
		}

		catch(e){
			this.error_msg(e)
		}

		this.vectors = vector_page_handler(vectors_page)
		this.moments = moment_page_handler(moments_page)

		let tok = tableService.getToken()
		console.log(tok)
	},
	
	watch: {
		show_vectors(val) {
			if (val) {
				this.labels = this.vectors_labels
				
				for (let i in this.moments) {
					this.moments[i].check = false
				}
				
			}
			else {
				this.labels = this.moments_labels

				for (let i in this.vectors) {
					this.vectors[i].check = false
				}
			}
		},

		modifying(val) {
			if (val) {
				this.labels = this.vectors_labels.slice(1)
			}
			else {
				this.labels = this.moments_labels.slice(1)
			}
		},

		deleting(val) {
			if (val) {
				this.delete()
			}
		}
	}
}
</script>
