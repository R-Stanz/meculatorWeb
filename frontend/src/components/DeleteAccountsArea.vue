<template>
	<section id="delete_area">
		<h1>Delete An Account</h1>
		<p
			v-if="del_show_alert"
			:class="del_alert_variant"
		> 
			{{ del_alert_msg }} 
		</p>
		
		<vee-form id="del_form" :validation-schema="schema" @submit="del">

			<div style="flex-basis=0">
				<div class="del_wrapper">
				<label id="label_delete_account">Username Account To Be Deleted:</label>

					<vee-field 
						type="text"
						name="username"
						placeholder="Delete Username"
					/>
					<ErrorMessage class="error" name="username" />
				</div>
			</div>

			<div id="row">
				<label id="del_conf">Your Account Password:</label>		

				<div class="del_wrapper">
					<vee-field 
						type="password" 
						name="password"
						placeholder="Your Password"
					/> 
					<ErrorMessage class="error" name="password" />
				</div>

				<button
				       type="submit"
				       :disabled="del_in_submission"
				>
					Delete
				</button>
			</div>

		</vee-form>
	</section>

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
				password: "required|min:6|max:50|"
			},

			del_in_submission: 	false,
			del_show_alert: 	false,
			del_alert_variant: 	"info",
			del_alert_msg: 		"Account being deleted!",
		}
	},
	methods: {
		async del(values) {
			this.del_show_alert = true
			this.del_in_submission = true
			this.del_alert_variant = "info"
			this.del_alert_msg = "Account being deleted!"

			try {
				//await authenticationService.getRole(values)
				await authenticationService.delAcc(values)

				this.del_alert_variant = "success"
				this.del_alert_msg = "Account deleted!"

				for (let i in values) {
					values[i] = ""
				}
			}
			catch(e) {
				this.del_in_submission 	= false
				this.del_alert_variant 	= "error"

				if(isAxiosError(e)) {
					this.del_alert_msg = e.response?.data.error.message
				}
				else if(e instanceof Error) {
					this.del_alert_msg = e.message
				}
			}

			setTimeout(function () {
				this.del_in_submission = false
				this.del_show_alert = false
			}.bind(this), 3500)
		},
	},
}
</script>
