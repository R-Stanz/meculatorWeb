<template>
	<ul id="side_nav">
		<button
			type="buton"
			@click="new_vector"			
			class="menu"
		><li>
			Create Vector
		</li></button>
		
		<button
			type="button"
			@click="new_momentum"
			class="menu"
		><li>
			Create Momentum
		</li></button>

		<button
			v-if="!show_vectors"
			type="button"
			@click="toggle_tables"
			class="menu"
		><li>
			Vectors Table
		</li></button>

		<button 
			v-else
			type="button"
			@click="toggle_tables"
			class="menu"
		><li>
			Momenta Table
		</li></button>
	</ul>
</template>

<style scoped src="@/assets/css/user.css">
</style>

<script>
export default {
	props: {
		show_vectors: Boolean,
	},
	emits: ["toggle_tables"],
	methods: {
		toggle_tables() {
			this.$emit("toggle_tables")
		}
	}
}
</script>
