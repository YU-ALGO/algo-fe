import { createApp } from 'vue'
import App from '@/App.vue'
import router from '@/router'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.esm.min.js'
import 'bootstrap-icons/font/bootstrap-icons.css'

import store from './store'

// import { useAuth } from '@/composables/user'

createApp(App).use(router).use(store).mount('#app')
// createApp(App).use(router).mount('#app')