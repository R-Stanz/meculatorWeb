<template>
<div id="background">

	<main class="flex">
		<div class="flex row" id="top">
			<router-link 
				id="go_home" 
				:to="{ name: 'home' }"
				:style="login_show_alert ? 
					{ 
						'pointer-events': 'none',
						'color': '#324A5F'
					} : {}"
			>
				<i class="bi bi-caret-left"></i>
			</router-link>

			<div 
				v-if="login_show_alert"
				:class="login_alert_variant"
			>
				{{ login_alert_msg }}
			</div>

			<div 
				id="empty" 
				v-if="!login_show_alert"></div>

		</div>
		<h1>Login</h1>
		<vee-form id="form" :validation-schema="schema" @submit="login">

			<section>

				<div class="input_div">
					<label>Username/Email:</label>				
					<vee-field type="text" name="identifier" class="input"
						id="identifier" placeholder="Username or Email" />			
					<ErrorMessage class="required" name="identifier" />		
				</div>

				<div class="input_div">
					<label>Password:</label>				
					<vee-field type="password" name="password" class="input"
						id="password" placeholder="Password" />			
					<ErrorMessage class="required" name="password" />		
				</div>

			</section>

			<button 
				type="submit"
				:disabled="login_in_submission"
			>
				Login
			</button>

		</vee-form>
	</main>

</div>
</template>

<style scoped src="@/assets/css/login.css">
</style>

<script>
import { api } from "@/api"
import { authenticationService } from "@/api/AuthenticationService"
import { isAxiosError } from "axios"

export default {
	data() {
		return {
			schema: {
				identifier: "required|min:3|max:40",
				password: "required|min:6|max:50"
			},

			login_in_submission:	false,
			login_show_alert:	false,
			login_alert_variant:	"info",
			login_alert_msg:	"Loging in!",
		}
	},
	
	methods: {
		async login(values) {
			this.login_show_alert = true
			this.login_in_submission = true
			this.login_alert_variant = "info"
			this.login_alert_msg = "Loging in!!"

			
			try {
				const user = await authenticationService.login(values)

				this.login_alert_variant = "success"
				this.login_alert_msg = "Success, logged in!"

				if(user.role == "admin") {
					this.$router.push("admin")
				}
				else if(user.role == "authenticated"){
					this.$router.push("user")
				}
				else {
					this.$router.push("login")
				}
			}

			catch(error) {

				this.login_in_submission = false
				this.login_alert_variant = "error"
				this.login_alert_msg	 = error.message
				setTimeout(function () {
					this.login_show_alert	 = false
				}.bind(this), 3500)
			}
			
		}
	}
}
</script>
