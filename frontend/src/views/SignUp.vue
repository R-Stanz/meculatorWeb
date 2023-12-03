<template>
<body>

	<main class="flex">
		<div class="flex row" id="top">
			<router-link 
				id="go_home" 
				:to="{ name: 'home' }"
				:style="login_show_alert ? 
					{ 
						'pointer-events': 'none',
					       	'background-color' : 'green',
						'color' : 'green',
						'border' : 'none',
					} : {}"
			>
				<i class="bi bi-caret-left"></i>
			</router-link>

			<div 
				v-if="reg_show_alert"
				:class="reg_alert_variant"
			>
				{{ reg_alert_msg }}
			</div>

			<div 
				id="empty" 
				v-if="!reg_show_alert"></div>

		</div>
		<h1>Sign-Up</h1>
		<vee-form id="form" :validation-schema="schema" @submit="register">

			<section>

				<div class="input_div">
					<label>Username:</label>				
					<vee-field type="text" name="username" class="input"
						id="username" placeholder="Username" />			
					<ErrorMessage class="required" name="username" />		
				</div>

				<div class="input_div">
					<label>Password:</label>				
					<vee-field type="password" name="password" class="input"
						id="password" placeholder="Password" />			
					<ErrorMessage class="required" name="password"
					/>		
				</div>

			</section>

			<button 
				type="submit"
				:disabled="reg_in_submission"
			>
				Register
			</button>

		</vee-form>
	</main>

</body>
</template>

<style scoped src="@/assets/css/sign_up.css">
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
				this.$router.push({ name: "login" })
				}.bind(this), 7000)

		},
	},
}
</script>
