<template>
	<div id="background">

		<nav>
			<router-link class="login" :to="{ name: 'login' }">
				Login
			</router-link>
			<router-link class="login" id="sign_up" :to="{ name: 'sign_up' }">
				Sign-up
			</router-link>
		</nav>

		<main id="section1">
				<a id="init_msg" href="#intro">
					Welcome To<br/>Meculator
				</a>
		</main>

		<section id="intro">
			<div id="decription">
				<h2> What it is... </h2>
				<p> 	
					The meculator is a calculator foucused on
					solving physical problems, mainly those
					involving concepts of <span> statics</span>.
				</p>
				<p>
					Initially there only simple operations with
					vectors and moments of force. Checkout the
					github of this project by clicking on the
					buttom bellow.
				</p>
			</div>

			<a id="git" href="https://github.com/R-Stanz/meculatorWeb/tree/main" target="_blank" rel="noopener noreferrer">This Project Repository<br /><i class="bi bi-github"></i></a>
		</section>

	</div>
</template>

<style scoped src="@/assets/css/home.css">
</style>

<!--
<script>
import { api } from "@/api"
import { useUserStore } from "@/stores/userStore"

export default {
}
</script>
-->
