<template>
	 <nav>
		 <router-link id="log_out" :to="{ name: 'home' }" @click="userStore.logout">
			 <i class="bi bi-arrow-bar-left"></i>
		 </router-link>
		<p id="account_mode">Admin Access</p>
		<p></p>
	</nav>
</template>

<style scoped src='@/assets/css/admin.css'>
</style>

<script>
import { useUserStore } from "@/stores/userStore"

export default {
	data() {
		return {
			userStore: useUserStore()
		}
	}
}
</script>
