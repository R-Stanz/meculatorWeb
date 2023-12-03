<template>
	<aside id="admin_creation">
		<h1>New Admin Account</h1>
		<p
			v-if="reg_show_alert"
			:class="reg_alert_variant"
		> 
			{{ reg_alert_msg }} 
		</p>
		
		<vee-form id="new_admin_form" :validation-schema="schema" @submit="register">

			<div class="camps">
				<label>Username:</label>					
				
				<vee-field 
					type="text"
					name="username"
					id="new_admin"
					placeholder="New Admin Name"
				/>
				<ErrorMessage class="error" name="username" />

				<label>New Account Password:</label>				
			</div>
			
			<div class="camps">
			<vee-field 
				type="password" 
				name="password" 
				id="password" 
				placeholder="Password"
			/>
			<ErrorMessage class="error" name="password" />
			</div>
			
			<button 
				type="submit"
				id="create"
				:disabled="reg_in_submission"
			>
				Create
			</button>
		</vee-form>
	</aside>
</template>

<style scoped src='@/assets/css/admin.css'>
</style>

<script>
export default {
	data() {
		return {
			schema: {
				username: "required|min:3|max:40|alpha_dash",
				password: "required|min:6|max:50|"
			},

			reg_in_submission: 	false,
			reg_show_alert: 	false,
			reg_alert_variant: 	"info",
			reg_alert_msg: 		"Account being created!",
		}
	},
	methods: {
		register(values) {
			this.reg_show_alert = true
			this.reg_in_submission = true
			this.reg_alert_variant = "info"
			this.reg_alert_msg = "Account being created!"

			this.reg_alert_variant = "success"
			this.reg_alert_msg = "Account created!"

			setTimeout(function () {
				this.reg_in_submission = false
				this.reg_show_alert = false
				}.bind(this), 3000)
		},
	},
}
</script>
