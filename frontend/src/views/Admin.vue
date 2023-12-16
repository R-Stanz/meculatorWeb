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
	/*
	name: "Admin",
	beforeRouteEnter(to, from, next) {
		const store = useUserStore()
	}
	*/
}
</script>
