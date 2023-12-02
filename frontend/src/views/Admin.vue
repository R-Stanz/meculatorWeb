<template>
<body>

	 <nav>
		 <router-link id="log_out" :to="{ name: 'home' }">
			 <i class="bi bi-arrow-bar-left"></i>
		 </router-link>
		<p id="account_mode">Admin Access</p>
		<p></p>
	</nav>

	<main id="functions">
		<aside id="admin_creation">
			<h1>New Admin Account</h1>
			<form>
				<label for="new_admin">Username:</label>			<br>
				<input type="text" id="new_admin" placeholder="New Admin Name"> <br><br>

				<label for="passward">New Account Password:</label>		<br>
				<input type="password" id="password" placeholder="Password"> 	<br>

				<input type="submit" value="Create">
			</form>
		</aside>
		<section id="delete_area">
			<h1>Delete An Account</h1>
			<form>
				<label for="username" id="label_delete_account">Username Account To Be Deleted:</label><br>
				<input type="text" id="username" placeholder="Delete Username">	<br><br>

				<label for="password" id="del_conf">Your Account Password:</label>		
				<input type="password" id="password" placeholder="Your Password"> 

				<input type="submit" value="Delete">
			</form>
		</section>
	</main>

</body>
</template>

<style scoped src='@/assets/css/admin.css'>
</style>
