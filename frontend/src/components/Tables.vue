<template>
	<main>
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
				<td><input 
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

			schema: {
				data: "required|min:1|max:30|alpha_dash"
			},
			vectors: [],
			
			edit_in_submission:	false,
			edit_show_alert:	false,
			edit_alert_variant:	"info",
			edit_alert_msg:		"Loding!",
		}
	},

	methods: {
		select_vector(vector) {
			this.$emit("select_vector(vector)")
		}
	},
	
	computed: {
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
				/*
				for (let i in this.moments) {
					this.moments[i].check = false
				}
				*/
			}
			else {
				this.labels = this.moments_labels

				for (let i in this.vectors) {
					this.vectors[i].check = false
				}
			}
		},
	}
}
</script>
