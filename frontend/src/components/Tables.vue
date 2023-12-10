<template>
	<main>
		<table>
			<tr>
				<th>Name</th>
				<th>Magnitude</th>
				<th>Unit</th>
				<th>i</th>
				<th>Unit</th>
				<th>j</th>
				<th>Unit</th>
				<th>k</th>
				<th>Unit</th>
				<th>XY Reference</th>
				<th>Unit</th>
				<th>XZ Reference</th>
				<th>Unit</th>
				<th>YZ Reference</th>
				<th>Unit</th>
			</tr>
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
			<!--
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
export default {
	props: {
		show_vectors: Boolean,
	},
	data() {
		return {
		}
	},
	methods: {
		toggle_tables() {
			console.log("Clicked")
			this.$emit("toggle_tables")
		},
	},
}
</script>
