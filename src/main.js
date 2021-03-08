import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/index.js'

import 'bootstrap'; 
import 'bootstrap/dist/css/bootstrap.min.css';

import axios from 'axios';

axios.defaults.withCredentials = true
axios.defaults.baseURL = 'http://localhost:8080/';

createApp(App).use(store).use(router).mount('#app')
