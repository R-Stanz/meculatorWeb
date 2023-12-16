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

				<label>E-mail:</label>				
			</div>

			<div class="camps">
				<vee-field 
					type="text"
					name="email"
					id="email"
					placeholder="New Admin E-mail"
				/>
				<ErrorMessage class="error" name="email" />

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
import { authenticationService } from "@/api/AuthenticationService"
import { isAxiosError } from "axios"

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
			this.reg_show_alert = true
			this.reg_in_submission = true
			this.reg_alert_variant = "info"
			this.reg_alert_msg = "Account being created!"

			try {
				await authenticationService.newAdmin(values)
				this.reg_alert_variant = "success"
				this.reg_alert_msg = "Account created!"
			}
			catch(e) {
				this.reg_in_submission 	= false
				this.reg_alert_variant 	= "error"

				if(isAxiosError(e)) {
					console.log(e.reponse)
					this.reg_alert_msg = e.response.data
				}
				else if(e instanceof Error) {
					this.reg_alert_msg = e.message
				}
			}
			finally {
				setTimeout(function () {
					this.reg_in_submission = false
					this.reg_show_alert = false
					this.reg_alert_variant = "info"
					this.reg_alert_msg = "Account being created!"
				}.bind(this), 3500)
			}

		},
	},
}
</script>
