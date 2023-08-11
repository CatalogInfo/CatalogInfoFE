import './assets/main.css'

import { createApp } from 'vue'
import PrimeVue from 'primevue/config'
import store from './store/store'
import App from './App.vue'
import router from './router'
import YouTube from 'vue3-youtube'
import Toast from 'primevue/toast'
import ToastService from 'primevue/toastservice'
import ToastManager from './managers/toast_manager'
import AddButtonVue from './components/buttons/AddButton.vue'

const app = createApp(App)

app
  .component('YouTube', YouTube)
  .use(store)
  .use(router)
  .use(PrimeVue)
  .use(ToastService)
  .component('Toast', Toast)
  .component('AddButton', AddButtonVue)

app.mount('#app')

ToastManager.injectToastService(app.config.globalProperties.$toast)
