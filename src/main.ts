import './assets/main.css'

import { createApp } from 'vue'
import PrimeVue from 'primevue/config'
import store from './store/store'

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(store)
app.use(router)
app.use(PrimeVue)

app.mount('#app')
