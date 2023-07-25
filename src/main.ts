import './assets/main.css'

import { createApp } from 'vue'
import PrimeVue from 'primevue/config'
import store from './store/store'

import App from './App.vue'
import router from './router'
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { faUserSecret } from '@fortawesome/free-solid-svg-icons'

import { config } from "@fortawesome/fontawesome-svg-core";
// import { fad } from "@fortawesome/pro-duotone-svg-icons";
library.add(faUserSecret);
config.styleDefault = "duotone";

const app = createApp(App)

app.use(store)
app.use(router)
app.use(PrimeVue)
app.component("font-awesome-icon", FontAwesomeIcon)
app.mount('#app')
