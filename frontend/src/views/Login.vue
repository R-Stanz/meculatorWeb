<template>
<body>

	<main class="flex">
		<div class="flex row" id="top">
			<router-link id="go_home" :to="{ name: 'home' }">
				<i class="bi bi-caret-left"></i>
			</router-link>
			<div id="empty"></div>
		</div>
		<h1>Login</h1>
		<vee-form id="form" :validation-schema="schema">

			<section>

				<div>
					<label>Username:</label>				
					<vee-field type="text" name="username" class="input"
						id="username" placeholder="Username" />			
					<ErrorMessage class="required" name="username" />		
				</div>

				<div>
					<label>Password:</label>				
					<vee-field type="password" name="password" class="input"
						id="password" placeholder="Password" />			
					<ErrorMessage class="required" name="password" />		
				</div>

			</section>

			<button type="submit">Login</button>

		</vee-form>
	</main>

</body>
</template>

<style scoped src="@/assets/css/login.css">
</style>

<script>
export default {
	data() {
		return {
			schema: {
				username: "required|min:3|max:40",
				password: "required|min:6|max:50"
			}
		}
	}
}
</script>
