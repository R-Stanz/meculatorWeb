<template>
<body>

	<main class="flex">
		<div class="flex row" id="top">
			<router-link id="go_home" to="/">
				<i class="bi bi-caret-left"></i>
			</router-link>
			<div id="empty"></div>
		</div>
		<h1>Login</h1>
		<form>
			<label for="username">Username:</label>				<br />
			<input type="text" id="username" placeholder="Username">	<br />

			<label for="password">Password:</label>				<br />
			<input type="password" id="password" placeholder="Password">	<br />

			<input type="submit" value="Login" >
		</form>
	</main>

</body>
</template>

<style scoped src="@/assets/css/login.css">
</style>
