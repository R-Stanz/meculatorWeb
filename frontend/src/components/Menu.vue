<template>
	<ul id="side_nav">
		<button
			v-if="tableStore.show_vectors && tableStore.checked.length == 1 && !tableStore.locked"
			type="button"
			@click="tableStore.edit_option()"			
			class="menu"
		><li>
			Edit Vector 
		</li></button>

		<button
			v-if="!tableStore.show_vectors && tableStore.checked.length == 1 && !tableStore.locked"
			type="button"
			@click="tableStore.edit_option()"			
			class="menu"
		><li>
			Edit Moment 
		</li></button>

		<button
			v-if="tableStore.show_vectors && tableStore.checked.length == 2"
			type="button"
			@click="tableStore.vectors_moment()"			
			class="menu"
		><li>
			Resultant Moment 
		</li></button>

		<button
			v-if="tableStore.show_vectors && tableStore.checked.length > 1"
			type="button"
			@click="tableStore.vectors_resultant()"			
			class="menu"
		><li>
			Vectors Resultant
		</li></button>

		<button
			v-if="!tableStore.show_vectors && tableStore.checked.length > 1"
			type="button"
			@click="tableStore.moments_resultant()"			
			class="menu"
		><li>
			Moments Resultant 
		</li></button>

		<button
			v-if="tableStore.show_vectors && tableStore.checked.length > 0"
			type="button"
			@click="tableStore.delete()"			
			class="menu"
		><li>
			Delete Vector
		</li></button>

		<button
			v-if="!tableStore.show_vectors && tableStore.checked.length > 0"
			type="button"
			@click="tableStore.delete()"			
			class="menu"
		><li>
			Delete Moment
		</li></button>

		<button
			v-if="tableStore.show_vectors && !tableStore.locked"
			type="button"
			@click="tableStore.create_option()"			
			class="menu"
		><li>
			Vector Creation
		</li></button>
		
		<button
			v-if="!tableStore.show_vectors && !tableStore.locked"
			type="button"
			@click="tableStore.create_option()"
			class="menu"
		><li>
			Moment Creation
		</li></button>

		<button
			v-if="!tableStore.show_vectors"
			type="button"
			@click="tableStore.toggle()"
			class="menu"
		><li>
			Vectors Table
		</li></button>

		<button 
			v-else
			type="button"
			@click="tableStore.toggle()"
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
	data() {
		return {
		}
	},
}
</script>
