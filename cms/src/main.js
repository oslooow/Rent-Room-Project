import { createApp } from 'vue'
import App from './App.vue'

import './assets/main.css'

import vue3GoogleLogin from 'vue3-google-login'

import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';

const app = createApp(App)

app.use(VueSweetalert2);
app.use(vue3GoogleLogin, {
  clientId: '835334906881-55ep79gfsoi0r6us3j2bcmf37ivqju9a.apps.googleusercontent.com'
})

app.mount('#app')
