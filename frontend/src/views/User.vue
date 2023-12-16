<template>
<div id="background">

	<aside>
		<h1 id="welcome_msg">Meculator</h1>

		<Menu 
			:show_vectors="show_vectors" 
			:selected_list="selected_list" 
			:modifying="modifying"
			@creation="creation"
		    	@modify="modifying=true"
			@toggle_tables="toggle_tables"
		    	@edit="modifying=true"
		    	@delete="deleting=true"
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
		:selected_list="selected_list" 
		:modifying="modifying"
		:deleting="deleting"
		@select="select"
		@done_modifying="modifying=false; selected_list = []"
		@deleted="deleting=false; selected_list = []"
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
			selected_list: [],
			modifying: false,
			deleting: false,
		}
	},

	methods: {
		toggle_tables() {
			this.selected_list = []

			this.modifying = false
			this.show_vectors = !this.show_vectors
		},
		
		select(id) {
			for (let i = 0; i < this.selected_list.length; i++) {
				if(this.selected_list[i] == id) {
					this.selected_list[i] 
					this.selected_list.splice(i, 1)
					return
				}
			}
			this.selected_list.push(id)
		},

		creation() {
			this.modifying = true
			this.selected_list = [] 
		}
	},

	watch: {
	}
}
</script>
