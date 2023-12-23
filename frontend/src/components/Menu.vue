<template>
	<ul id="side_nav">
		<button
			v-if="show_vectors && single_selected && !modifying"
			type="button"
			@click="$emit('modify')"			
			class="menu"
		><li>
			Edit Vector 
		</li></button>

		<button
			v-if="!show_vectors && single_selected && !modifying"
			type="button"
			@click="$emit('modify')"			
			class="menu"
		><li>
			Edit Moment 
		</li></button>

		<button
			v-if="show_vectors && vector_pair_selected"
			type="button"
			@click="vectors_result"			
			class="menu"
		><li>
			Resultant Moment 
		</li></button>

		<button
			v-if="show_vectors && couple_selected"
			type="button"
			@click="vectors_result"			
			class="menu"
		><li>
			Vectors Resultant
		</li></button>

		<button
			v-if="!show_vectors && couple_selected"
			type="button"
			@click="moments_result"			
			class="menu"
		><li>
			Moments Resultant 
		</li></button>

		<button
			v-if="show_vectors && (single_selected || couple_selected)"
			type="button"
			@click="$emit('delete')"			
			class="menu"
		><li>
			Delete Vector
		</li></button>

		<button
			v-if="!show_vectors && (single_selected || couple_selected)"
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
import { useTableStore } from "@/stores/tableStore"

export default {
	setup() {
		const tableStore = useTableStore()
		return { tableStore }
	},
	props: {
		show_vectors: Boolean,
		selected_list: Array,
		modifying: Boolean,
		creating: Boolean,
	},
	emits: ["toggle_tables", "modify", "creation", "delete"],
	data() {
		return {
			single_selected: 	false,
			vector_pair_selected: 	false,
			couple_selected: 	false,
		}
	},
	methods: {
		toggle_tables() {
			this.tableStore.toggle()
		}
	},
	watch: {
		selected_list: {
			handler (val) {
				if (this.show_vectors && val.length == 1) {
					this.single_selected = true
					this.vector_pair_selected = false
					this.couple_selected = false
				}
				else if (this.show_vectors && val.length == 2) {
					this.single_selected = false
					this.vector_pair_selected = true
					this.couple_selected = true
				}
				else if (this.show_vectors && val.length > 0) {
					this.single_selected = false
					this.vector_pair_selected = false
					this.couple_selected = true
				}
				else if (this.show_vectors) {
					this.single_selected = false
					this.vector_pair_selected = false
					this.couple_selected = false
				}
				else if (!this.show_vectors && val.length == 1) {
					this.single_selected = true
					this.vector_pair_selected = false
					this.couple_selected = false
				}
				else if (!this.show_vectors && val.length > 0) {
					this.single_selected = false
					this.vector_pair_selected = false
					this.couple_selected = true
				}
				else if (!this.show_vectors) {
					this.single_selected = false
					this.vector_pair_selected = false
					this.couple_selected = false
				}
				
			},
			deep: true
		},
	}
}
</script>
