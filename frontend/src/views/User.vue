<template>
<div id="background">

	<aside>
		<h1 id="welcome_msg">Meculator</h1>

		<Menu 
			:show_vectors="show_vectors" 
			@toggle_tables="show_vectors = !show_vectors"
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
			show_vectors: true
		}
	}
}
</script>
