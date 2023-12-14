<template>
	<ul id="side_nav">
		<button
			v-if="single_vector_selected && !modifying"
			type="button"
			@click="$emit('modify')"			
			class="menu"
		><li>
			Edit Vector 
		</li></button>

		<button
			v-if="single_moment_selected && !modifying"
			type="button"
			@click="$emit('modify')"			
			class="menu"
		><li>
			Edit Moment 
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
			@click="$emit('delete')"			
			class="menu"
		><li>
			Delete Vector
		</li></button>

		<button
			v-if="single_moment_selected || couple_moments_selected"
			type="button"
			@click="$emit('delete')"			
			class="menu"
		><li>
			Delete Moment
		</li></button>

		<button
			v-if="show_vectors && !modifying"
			type="button"
			@click="$emit('creation')"			
			class="menu"
		><li>
			Vector Creation
		</li></button>
		
		<button
			v-if="!show_vectors && !modifying"
			type="button"
			@click="$emit('creation')"
			class="menu"
		><li>
			Moment Creation
		</li></button>

		<button
			v-if="!show_vectors"
			type="button"
			@click="$emit('toggle_tables')"
			class="menu"
		><li>
			Vectors Table
		</li></button>

		<button 
			v-else
			type="button"
			@click="$emit('toggle_tables')"
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
		modifying: Boolean,
		creating: Boolean,
	},
	emits: ["toggle_tables", "modify", "creation", "delete"],
	data() {
		return {
			single_vector_selected: false,
			single_moment_selected: false,
			pair_vector_selected: 	false,
			couple_vectors_selected: false,
			couple_moments_selected: false,
		}
	},
	methods: {
	},
	watch: {
		vectors_selected: {
			handler (val) {
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

		moments_selected: {
			handler (val) {
				if (!this.show_moments && val.length == 1) {
					this.single_moment_selected = true
					this.couple_moments_selected = false
				}
				else if (!this.show_moments && val.length > 0) {
					this.single_moment_selected = false
					this.couple_moments_selected = true
				}
				else {
					this.single_moment_selected = false
					this.couple_moments_selected = false
				}
			},
			deep: true
		},
	}
}
</script>
