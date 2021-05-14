import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/index.js'

import 'bootstrap'; 
import 'bootstrap/dist/css/bootstrap.min.css';

import axios from 'axios';

import BaseAlert from './views/ui/BaseAlert.vue'
import BaseButton from './views/ui/BaseButton.vue'

axios.defaults.withCredentials = true
axios.defaults.baseURL = 'http://localhost:8080/';


createApp(App)
.component('base-alert', BaseAlert)
.component('base-button', BaseButton)
.use(store).use(router)
.mount('#app')
