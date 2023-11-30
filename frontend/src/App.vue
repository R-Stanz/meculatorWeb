<template>
	<router-view></router-view>
</template>

<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<style>
html {
	scroll-behavior: smooth;
}

body {
	position: absolute;
	top: 0;
	right: 0;
	display: grid;
}
</style>
