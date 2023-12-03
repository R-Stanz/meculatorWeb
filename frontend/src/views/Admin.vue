<template>
<body>

	 <AdminBar></AdminBar>

	<main id="functions">
		<NewAdmin></NewAdmin>
		<DeleteAccounts></DeleteAccounts>
	</main>

</body>
</template>

<style scoped src='@/assets/css/admin.css'>
</style>

<script>
import AdminBar from '@/components/AdminBar.vue'
import NewAdmin from '@/components/NewAdminArea.vue'
import DeleteAccounts from '@/components/DeleteAccountsArea.vue'

export default {
	components: {
		AdminBar,
		NewAdmin,
		DeleteAccounts,
	}
}
</script>
