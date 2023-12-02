<template>
<body>

	<main class="flex">
		<div class="flex row" id="top">
			<router-link id="go_home" :to="{ name: 'home' }">
				<i class="bi bi-caret-left"></i>
			</router-link>
			<div id="empty"></div>
		</div>
		<h1>Sign-Up</h1>
		<form>
			<label for="username">Username:</label>				<br />
			<input type="text" id="username" placeholder="New Username">	<br />

			<label for="password">Password:</label>				<br />
			<input type="password" id="password" placeholder="Password">	<br />

			<input type="submit" value="New Account">
		</form>
	</main>

</body>
</template>

<style scoped src="@/assets/css/sign_up.css">
</style>
