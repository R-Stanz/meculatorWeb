import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import VeeValidatePlugin from "./includes/validation"
import axios from 'axios'
import vueAxios from 'vue-axios'

const app = createApp(App)

app.use(vueAxios, axios)
app.use(createPinia())
app.use(router)
app.use(VeeValidatePlugin)

app.mount('#app')
