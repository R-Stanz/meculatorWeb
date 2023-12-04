<template>
	<router-view></router-view>
</template>

<script setup>
	import { RouterLink, RouterView } from 'vue-router'
</script>

<style>
@import "bootstrap-icons/font/bootstrap-icons.css";

html {
	scroll-behavior: smooth;
}

body {
	position: absolute;
	top: 0;
	left: 0;
	display: grid;
	width: 100vw;
}
</style>
