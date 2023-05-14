import { createApp, markRaw } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import vue3GoogleLogin from "vue3-google-login";

import './assets/main.css'


const app = createApp(App)
const pinia = createPinia()

pinia.use(({ store }) => {
  store.router = markRaw(router)
})

app.use(vue3GoogleLogin, {
  clientId: `835334906881-55ep79gfsoi0r6us3j2bcmf37ivqju9a.apps.googleusercontent.com`,
});

app.use(pinia)
app.use(router)

app.mount('#app')
