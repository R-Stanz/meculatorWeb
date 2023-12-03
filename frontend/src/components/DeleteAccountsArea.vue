<template>
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
</template>

<style scoped src='@/assets/css/admin.css'>
</style>
