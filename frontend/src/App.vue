<template>
	<router-view></router-view>
</template>

<script>
import { RouterLink, RouterView } from 'vue-router'

export default {
	data() {
		return {
		}
	}
}
</script>

<style>
@import "bootstrap-icons/font/bootstrap-icons.css";

html {
	scroll-behavior: smooth;
}

#background {
	position: absolute;
	top: 0;
	left: 0;
	display: grid;
	min-width: 100vw;
}
</style>
