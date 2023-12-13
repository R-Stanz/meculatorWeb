<template>
	<main>
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
				:disabled="change_in_submission"
			> Apply Changes
			</button>

		</vee-form>
		<p @click="input_info"> Message </p>

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
					@click="$emit('select_vector', vector.id)" 
				/></td>
				<td
					v-for="(value, index) in vector.val"
					v-bind:key="index"
				>
					{{ value[1] }}
				</td>
			</tr>

			<!--
			<tr
				v-for="moment in moments"
				v-show="!show_vectors"
			>
				<input 
					type="checkbox" 
					v-model="moment_selected" 
				/>
				<td
					v-for="(value, index) in moment.val"
					v-bind:key="index"
				>
					{{ value[1] }}
				</td>
			</tr>
			-->
		</table>
	</main>
</template>

<style scoped src="@/assets/css/user.css">
</style>

<script>
import { tableService } from '@/api/TableService'
import { isAxiosError } from 'axios'
import { vector_handler } from '@/includes/dataHandler'

export default {
	props: {
		show_vectors: Boolean,
		vectors_selected: Array,
		moments_selected: Array,
		modifying: Boolean,
	},      
	
	emits: ["select_vector"],
	
	data() {
		return {
			vectors_labels: [
					"Select", "Name", "Magnitude", "Unit", "i", "Unit",
					"j", "Unit", "k", "Unit", "XY Reference", 
					"Unit", "XZ Reference", "Unit", "YZ Reference", "Unit"],
			moments_labels: [
					"Select", "Name", "Magnitude", "Unit", "i", "Unit",
					"j", "Unit", "k", "Unit", "XY Reference", 
					"Unit", "XZ Reference", "Unit", "YZ Reference", "Unit", "Is Torque"],
			labels: [
					"Select", "Name", "Magnitude", "Unit", "i", "Unit",
					"j", "Unit", "k", "Unit", "XY Reference", 
					"Unit", "XZ Reference", "Unit", "YZ Reference", "Unit"],

			vectors: [],
			moments: [],
			
			edit_in_submission:	false,
			edit_show_alert:	false,
			edit_alert_variant:	"info",
			edit_alert_msg:		"Loding!",
			items: [{ message: 'Foo', data: 11 }, { message: 'Bar', data: "lol" }],

			change_in_submission: 	false,
			change_show_alert: 	false,
			change_alert_variant: 	"info",
			change_alert_msg:	"Account being created!",

		}
	},

	methods: {
		input_info() {
			let info = []
			let stc_ent = []
			if (this.show_vectors) {
				for (let index in this.vectors) {
					if(this.vectors_selected[0] == this.vectors[index].id) {
						stc_ent = this.vectors[index].val.map((x) => x)
					}
				}
			}
			else {
				for (let index in this.moments) {
					if(this.moments_selected[0] == this.moments[index].id) {
						stc_ent = this.moments[index].val.map((x) => x)
					}
				}
			}
			info.push({name:stc_ent[0][0], val: stc_ent[0][1], type:"text"})
			stc_ent = stc_ent.splice(1)
			for (let i in stc_ent) {
				let input_type = ""
				if (i%2 == 0) {
					input_type = "number"
				}
				else {
					input_type = "text"
				}
				info.push({name:stc_ent[i][0], val:stc_ent[i][1], type:input_type})
			}
			return info
		},

		async apply(values) {
			change_in_submission = 	false
			change_show_alert = 	false
			change_alert_variant = 	"info"
			change_alert_msg =	"Account being created!"
		},
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
					console.log(i, name)
					if (i%2 == 0) {
						obj = { [name] : reference }
						//new_schema = Object.assign(new_schema, { name : numb })
					}
					else {
						obj = { [name] : numb }
						//new_schema = Object(new_schema, { name : reference })
					}
					new_schema = Object.assign(new_schema, obj)
				}
			}
			else {
				for (let i in this.moments[0].val) {
					if (i%2 == 1) {
						new_schema = push(new_schema, this.moments[0].val[i][0])
					}
					else {
						new_schema = push(new_schema, this.moments[0].val[i][0])
					}
				}
			}
			console.log(new_schema)
			return new_schema
		}
	},
	
	async mounted() {
		this.edit_in_submission = true
		this.edit_show_alert =	true

		let vectors_page = []
		try {
			vectors_page = await tableService.allVectors()

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
			this.edit_alert_variant = "error"

			if(isAxiosError(e)) {
				this.edit_alert_msg = e.response?.data.error.message
			}
			else if(e instanceof Error) {
				this.edit_alert_msg = e.message
			}
		}
		this.vectors = vector_handler(vectors_page)
	},
	
	watch: {
		show_vectors(val) {
			if(val) {
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
			if(val) {
				this.labels = this.vectors_labels.slice(1)
			}
			else {
				this.labels = this.vectors_labels
			}
		},
	}
}
</script>
