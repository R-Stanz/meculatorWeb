<template>
<div id="background">

	 <AdminBar></AdminBar>

	<main id="functions">
		<NewAdmin></NewAdmin>
		<DelAccounts></DelAccounts>
	</main>

</div>
</template>

<style scoped src='@/assets/css/admin.css'>
</style>

<script>
import AdminBar from '@/components/AdminBar.vue'
import NewAdmin from '@/components/NewAdminArea.vue'
import DelAccounts from '@/components/DeleteAccountsArea.vue'
import { useUserStore } from '@/stores/userStore'

export default {
	components: {
		AdminBar,
		NewAdmin,
		DelAccounts,
	},

	name: "admin",
	beforeRouteEnter(to, from, next) {
		const userStore = useUserStore()
		if (userStore.user.role == "admin") {
			next()
		}
		else {
			next({ name : "home" })
		}
	},
	/*
	beforeRouteLeave(to, from, next) {
		const userStore = useUserStore()
		console.log(userStore.user.role)
		if (userStore.user.role == "admin") {
		}
		else {
			next()
		}
	}
	*/
}
</script>
