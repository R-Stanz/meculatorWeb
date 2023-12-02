import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/views/Home.vue'
import Login from '@/views/Login.vue'
import SignUp from '@/views/SignUp.vue'
import Admin from '@/views/Admin.vue'

const routes = [
	{
		name: 'home',
		path: '/',
		component: Home
	},
	{
		name: 'login',
		path: '/login',
		component: Login
	},
	{
		path: '/log',
		redirect: { name: 'login' },
	},
	{
		name: 'sign_up',
		path: '/sign-up',
		component: SignUp
	},
	{
		path: '/sign',
		redirect: { name: 'sign_up' },
	},
	{
		name: 'admin',
		path: '/admin',
		component: Admin,
	},
	{
		path: '/:catchAll(.*)*',
		redirect: { name: 'home' },
	},
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
	console.log('Global Guard')

	next()
})

export default router
