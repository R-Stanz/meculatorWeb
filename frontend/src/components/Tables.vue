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
					v-for="(data, name, index) in input_info()" 
					:key="index"
				>
						<vee-field 
							:name="name"
							:placeholder="data.label"
							:id="name"
							:type="data.type"
							class="input"
						>
						</vee-field>
					<ErrorMessage class="required" :name="name" />
				</div>

				<div 
					class="inputs_area"
					v-if="!show_vectors"
				>
						<vee-field 
							name="is_torque"
							placeholder="Is Torque?"
							id="is_torque"
							as="select"
							class="input"
						>
							<option value="false">False</option>
							<option value="true">True</option>
						</vee-field>
					<ErrorMessage class="required" name="is_torque" />
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
				v-for="(vector, index) in vectors.data"
				v-show="show_vectors"
			>
				<td v-if="!modifying">
				<input 
					type="checkbox" 
					v-model="vector.check"
					@click="$emit('select', vector.id)" 
				/></td>
				<td
					v-for="(att, index) in vectors_attributes"
					v-bind:key="index"
				>
					{{ vector.attributes[att] }}
				</td>
			</tr>

			<tr
				v-for="(moment, index) in moments.data"
				v-show="!show_vectors"
			>
				<td v-if="!modifying">
				<input 
					type="checkbox" 
					v-model="moment.check"
					@click="$emit('select', moment.id)" 
				/></td>
				<td
					v-for="(att, index) in moments_attributes"
					v-bind:key="index"
				>
					{{ moment.attributes[att] }}
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
			vectors_labels: ["Select", "Name", "Magnitude", "Unit", "i", "Unit",
					"j", "Unit", "k", "Unit", "xy Reference", 
					"Unit", "xz Reference", "Unit", "yz Reference", "Unit"],

			moments_labels: ["Select", "Name", "Magnitude", "Unit", "i", "Unit",
					"j", "Unit", "k", "Unit", "xy Reference", 
					"Unit", "xz Reference", "Unit", "yz Reference", "Unit", "Is Torque"],

			labels: ["Select", "Name", "Magnitude", "Unit", "i", "Unit",
				"j", "Unit", "k", "Unit", "xy Reference", 
				"Unit", "xz Reference", "Unit", "yz Reference", "Unit"],

			vectors_attributes: [ "vector_name", "magnitude", "magnitude_unit", "magnitude_i", "magnitude_i_unit",
						"magnitude_j", "magnitude_j_unit", "magnitude_k", "magnitude_k_unit",
						"angle_xy_plane", "angle_xy_plane_unit", "angle_xz_plane", "angle_xz_plane_unit",
		       				"angle_yz_plane", "angle_yz_plane_unit"	],

			moments_attributes: [ "moment_name", "magnitude", "magnitude_unit", "magnitude_i", "magnitude_i_unit",
						"magnitude_j", "magnitude_j_unit", "magnitude_k", "magnitude_k_unit",
						"angle_xy_plane", "angle_xy_plane_unit", "angle_xz_plane", "angle_xz_plane_unit",
		       				"angle_yz_plane", "angle_yz_plane_unit", "is_torque"],
			vectors: {},
			moments: {},
			
			edit_in_submission:	false,
			edit_show_alert:	false,
			edit_alert_variant:	"info",
			edit_alert_msg:		"Loading!",
		}
	},

	methods: {
		input_info() {

			let info = {}
			let data = []
			if (this.show_vectors) {
				data = this.vectors_attributes
			}
			else {
				data = this.moments_attributes
			}

			for (let i in data){
				let index = data.length -1 -i
				if (!this.show_vectors && (i == 0)) {}
				else if ((index%2) != 0) {
					info = Object.assign({ [data[index]] : 
							{ type : "number", label : this.labels.at(index) }}, info)
				}
				else {
					info = Object.assign({ [data[index]] : 
							{ type : "text", label : this.labels.at(index) }}, info)
				}
			}
			return info
		},

		torque_info() {
			let stc_ent = []
			if (this.selected_list.length == 1) {
				let moment = this.find_by_id(this.selected_list[0])
				stc_ent = moment.val.map((x) => x)
			}
			else {
				let moment = this.moments[0]
				stc_ent = moment.val.map((x) => x)
			}

			return { name : stc_ent[0], val : stc_ent[1] }
		},

		find_by_id(id) {
			if(this.show_vectors) {
				for (let index in this.vectors.data) {
					if(id == this.vectors.data[index].id) {
						return this.vectors.data[index]					
					}
				}
			}
			else {
				for (let index in this.moments.data) {
					if(id == this.moments.data[index].id) {
						return this.moments.data[index]
					}
				}
			}
		},

		find_index_by_id(id) {
			if(this.show_vectors) {
				for (let index in this.vectors.data) {
					if(id == this.vectors.data[index].id) {
						return { index : [index], val : this.vectors.data[index] }
					}
				}
			}
			else {
				for (let index in this.moments.data) {
					if(id == this.moments.data[index].id) {
						return { index : [index], content : this.moments.data[index] }
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
					let index = info.index
					let vector = info.content

					await tableService.updateVector(id, values)
					let res = await tableService.getVector(id)
					res = res.data

					this.vectors.data[index] = res
				}
				else if (!this.show_vectors && this.selected_list.length == 1) {
					id = this.selected_list[0]
					let info = this.find_index_by_id(id)
					let index = info.index
					let moment = info.content

					await tableService.updateMoment(id, values)
					let res = await tableService.getMoment(id)
					res = res.data

					this.moments.data[index] = res
				}
				else if (this.show_vectors) {
					let res = await tableService.createVector(values)
					res = res.data
					res = Object.assign({ check : false }, res)
					this.vectors.data.push(res)
				}
				else {
					let res = await tableService.createMoment(values)
					res = res.data
					res = Object.assign({ check : false }, res)
					this.moments.data.push(res)
				}

				this.edit_alert_variant = "success"
				this.edit_alert_msg = "Successfully Edited!"

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

						for (let i in this.vectors.data) {
							if (this.vectors.data[i].id == id) {
								this.vectors.data.splice(i, 1)
							}
						}

						count++
					}
				}
				else {
					while (count < this.selected_list.length) {
						let id = this.selected_list[count]
						let res = await tableService.delMoment(id)

						for (let i in this.moments.data) {
							if (this.moments.data[i].id == id) {
								this.moments.data.splice(i, 1)
							}
						}

						count++
					}
				}
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
			let att = []

			if (this.show_vectors) {
				att = this.vectors_attributes
			}
			else {
				att = this.moments_attributes
			}

			for (let i in att) {
				let name = att[i]
				let obj = {}
				if (i%2 == 0) {
					obj = { [name] : reference }
				}
				else {
					obj = { [name] : numb }
				}
				new_schema = Object.assign(new_schema, obj)
			}

			return new_schema
		},

	},
	
	async mounted() {
		this.edit_in_submission = 	true
		this.edit_show_alert =		true

		try {
			this.vectors = await tableService.allVectors()
			this.moments = await tableService.allMoments()

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

		for (let i in this.vectors.data) {
			this.vectors.data[i] = Object.assign({ "check" : false }, this.vectors.data[i] )
		}
		for (let i in this.moments.data) {
			this.moments.data[i] = Object.assign({ "check" : false }, this.moments.data[i] )
		}
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

			this.edit_in_submission =	false
			this.edit_show_alert =		false
			this.edit_alert_varianti =	"info"
			this.edit_alert_msg =		"Loading!"
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
