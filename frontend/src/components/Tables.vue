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
			<!--
			<tr>
				<td>Car</td>
				<td>3</td>
				<td>kN</td>
				<td>3</td>
				<td>kN</td>
				<td>0</td>
				<td>N</td>
				<td>0</td>
				<td>N</td>
				<td>90</td>
				<td>deg</td>
				<td>90</td>
				<td>deg</td>
				<td>0</td>
				<td>Rad</td>
			</tr>
			<tr>
				<td>Ball</td>
				<td>33</td>
				<td>kN</td>
				<td>33</td>
				<td>kN</td>
				<td>0</td>
				<td>N</td>
				<td>0</td>
				<td>N</td>
				<td>90</td>
				<td>deg</td>
				<td>90</td>
				<td>deg</td>
				<td>0</td>
				<td>Rad</td>
			</tr>
			<tr v-for="row in vet">
				<td v-for="data in row">{{ data }}</td>
			</tr>
			-->
		</table>
	</main>
</template>

<style scoped src="@/assets/css/user.css">
</style>

<script>
import { tableService } from '@/api/TableService'

export default {
	props: {
		show_vectors: Boolean,
	},
	data() {
		return {
			vectors_labels: [
					"Name", "Magnitude", "Unit", "i", "Unit",
					"j", "Unit", "k", "Unit", "XY Reference", 
					"Unit", "XZ Reference", "Unit", "YZ Reference", "Unit"],
			moments_labels: [
					"Name", "Magnitude", "Unit", "i", "Unit",
					"j", "Unit", "k", "Unit", "XY Reference", 
					"Unit", "XZ Reference", "Unit", "YZ Reference", "Unit", "Is Torque"],
			labels: [
					"Name", "Magnitude", "Unit", "i", "Unit",
					"j", "Unit", "k", "Unit", "XY Reference", 
					"Unit", "XZ Reference", "Unit", "YZ Reference", "Unit"],

			schema: {
				data: "required|min:1|max:30|alpha_dash",
			},

			edit_in_submission:	false,
			edit_show_alert:	false,
			edit_alert_variant:	"info",
			edit_alert_msg:		"Loding!",
		}
	},

	methods: {

		//async mounted() {
		//	try {
		//		const res = await api.get(`/vectors`, {
		//			params: {
		//				'pagination[page]': 1,
		//				'pagination[pageSize]: 
		//		}
		//	}
		//	catch(error){
		//	}
	},

	watch: {
		show_vectors(val) {
			if(val) {
				this.labels = this.vectors_labels
			}
			else {
				this.labels = this.moments_labels
			}
		}
	},

	async mounted() {
		console.log("MSG")
	}
}
</script>
