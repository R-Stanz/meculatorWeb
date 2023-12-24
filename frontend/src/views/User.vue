<template>
<div id="background">

	<aside>
		<h1 id="welcome_msg">Meculator</h1>

		<Menu />

		<footer id="aside_footer">
		<router-link
			id="log_out"
			:to="{ name: 'home' }"
			@click="userStore.logout"
		>
				<i class="bi bi-arrow-bar-left"></i>
		</router-link>
		</footer>
	</aside>

	<tables />
</div>
</template>

<style scoped src="@/assets/css/user.css">
</style>

<script>
import Menu from '@/components/Menu.vue'
import Tables from '@/components/Tables.vue'
import { useUserStore } from '@/stores/userStore'

export default {
	components: {
		Menu,
		Tables,
	},
	data() {
		return {
			userStore: useUserStore(),
		}
	},

	name: "User",
	beforeRouteEnter(to, from, next) {
		const userStore = useUserStore()

		if (userStore.user.role == "authenticated") {
			next()
		}
		else {
			next({ name : "home" })
		}
	}
}
</script>
