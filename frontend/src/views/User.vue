<template>
<div id="background">

	<aside>
		<h1 id="welcome_msg">Meculator</h1>

		<Menu 
			:show_vectors="show_vectors" 
			:vectors_selected="vectors_selected" 
			:moments_selected="moments_selected" 
			:modifying="modifying"
			@creation="creation"
		    	@modify="modifying=true"
			@toggle_tables="toggle_tables"
		    	@vector_edition="modifying_vector = true"
		></Menu>

		<footer id="aside_footer">
		<router-link
			id="log_out"
			:to="{ name: 'home' }"
		>
				<i class="bi bi-arrow-bar-left"></i>
		</router-link>
		</footer>
	</aside>

	<Tables 
		:show_vectors="show_vectors" 
		:vectors_selected="vectors_selected" 
		:moments_selected="moments_selected" 
		:modifying="modifying"
		@select_vector="select_vector"
		@done_modifying="modifying=false; vectors_selected = []"
	></Tables>
</div>
</template>

<style scoped src="@/assets/css/user.css">
</style>

<script>
import Menu from '@/components/Menu.vue'
import Tables from '@/components/Tables.vue'

export default {
	components: {
		Menu,
		Tables,
	},
	data() {
		return {
			show_vectors: true,
			vectors_selected: [],
			moments_selected: [],
			modifying: false,
		}
	},

	methods: {
		toggle_tables() {
			if(this.show_vectors) {
				this.vectors_selected = []
			}
			else {
				this.moments_selected = []
				
			}
			this.modifying = false
			this.show_vectors = !this.show_vectors
		},
		
		select_vector(id) {
			for (let i = 0; i < this.vectors_selected.length; i++) {
				if(this.vectors_selected[i] == id) {
					this.vectors_selected[i] 
					this.vectors_selected.splice(i, 1)
					return
				}
			}
			this.vectors_selected.push(id)
		},

		creation() {
			this.modifying = true
			this.vectors_selected = [] 
			this.moments_selected = []
		}
	},

	watch: {
	}
}
</script>
