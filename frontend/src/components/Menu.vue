<template>
	<ul id="side_nav">
		<button
			v-if="single_vector_selected"
			type="button"
			@click="vector_edition"			
			class="menu"
		><li>
			Vector Edition
		</li></button>

		<button
			v-if="single_moment_selected"
			type="button"
			@click="vector_edition"			
			class="menu"
		><li>
			Moment Edition
		</li></button>

		<button
			v-if="pair_vector_selected"
			type="button"
			@click="vectors_result"			
			class="menu"
		><li>
			Resultant Moment 
		</li></button>

		<button
			v-if="couple_vectors_selected"
			type="button"
			@click="vectors_result"			
			class="menu"
		><li>
			Vectors Resultant
		</li></button>

		<button
			v-if="couple_moments_selected"
			type="button"
			@click="moments_result"			
			class="menu"
		><li>
			Moments Resultant 
		</li></button>

		<button
			v-if="single_vector_selected || couple_vectors_selected"
			type="button"
			@click="delete_vector"			
			class="menu"
		><li>
			Delete Vector
		</li></button>

		<button
			v-if="single_moment_selected || couple_moments_selected"
			type="button"
			@click="delete_moment"			
			class="menu"
		><li>
			Delete Moment
		</li></button>

		<button
			v-if="show_vectors"
			type="button"
			@click="new_vector"			
			class="menu"
		><li>
			Vector Creation
		</li></button>
		
		<button
			v-if="!show_vectors"
			type="button"
			@click="moment_creation"
			class="menu"
		><li>
			Moment Creation
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
		vectors_selected: Array,
		moments_selected: Array,
	},
	emits: ["toggle_tables"],
	data() {
		return {
			single_vector_selected: false,
			single_moment_selected: false,
			pair_vector_selected: false,
			couple_vectors_selected: false,
			couple_moments_selected: false,
		}
	},
	methods: {
		toggle_tables() {
			this.$emit("toggle_tables")
		}
	},
	watch: {
		vectors_selected: {
			handler (val, older) {
				if (this.show_vectors && val.length == 1) {
					this.single_vector_selected = true
					this.pair_vector_selected = false
					this.couple_vectors_selected = false
				}
				else if (this.show_vectors && val.length == 2) {
					this.single_vector_selected = false
					this.pair_vector_selected = true
					this.couple_vectors_selected = true
				}
				else if (this.show_vectors && val.length > 0) {
					this.single_vector_selected = false
					this.pair_vector_selected = false
					this.couple_vectors_selected = true
				}
				else {
					this.single_vector_selected = false
					this.pair_vector_selected = false
					this.couple_vectors_selected = false
				}
			},
			deep: true
		},
	}
}
</script>
