import './assets/main.css'

import { createApp } from 'vue'
import PrimeVue from 'primevue/config'
import store from './store/store'
import App from './App.vue'
import router from './router'
import YouTube from 'vue3-youtube'

const app = createApp(App)

app.component('YouTube', YouTube)
app.use(store)
app.use(router)
app.use(PrimeVue)
app.mount('#app')
