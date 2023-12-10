<template>
<div id="background">

	<main class="flex">
		<div class="flex row" id="top">
			<router-link 
				id="go_home" 
				:to="{ name: 'home' }"
				:style="reg_in_submission ? 
					{ 
						'pointer-events': 'none',
						'color': '#0C1821'
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
					<label>E-mail:</label>				
					<vee-field type="text" name="email" class="input"
						id="email" placeholder="E-mail" />			
					<ErrorMessage class="required" name="email" />		
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

</div>
</template>

<style scoped src="@/assets/css/sign_up.css">
</style>

<script>
export default {
	data() {
		return {
			schema: {
				username: "required|min:3|max:40|alpha_dash",
				email:	  "required|min:3|max:40|email",
				password: "required|min:6|max:50|"
			},

			reg_in_submission: 	false,
			reg_show_alert: 	false,
			reg_alert_variant: 	"info",
			reg_alert_msg: 		"Account being created!",
		}
	},
	methods: {
		async register(values) {
			this.reg_show_alert 	= true
			this.reg_in_submission 	= true
			this.reg_alert_variant 	= "info"
			this.reg_alert_msg 	= "Account being created!"

			try {
				console.log(this.username, this.password, this.email)
				await this.axios.post(`http://localhost:1337/api/auth/local/register`, {
					username: values.username, 
					password: values.password, 
					email: values.email, 
					role: 1
				})

				this.reg_alert_variant 	= "success"
				this.reg_alert_msg 	= "Account created!"

				setTimeout(function () {
							this.$router.push({ name: "login" }
				)}.bind(this), 1000)
			}

			catch(error) {
				console.log(error)
				this.reg_in_submission 	= false
				this.reg_alert_variant 	= "error"
				this.reg_alert_msg 	= error.message
				setTimeout(function () {
							this.reg_show_alert 	= false
				}.bind(this), 3500)
			}

		},
	},
}
</script>
