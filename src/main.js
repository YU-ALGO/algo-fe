import { createApp } from 'vue'
import App from '@/App.vue'
import router from '@/router'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap'
import '@/RemixIcon_Fonts_v2.5.0/fonts/remixicon.css'

import store from './store'

// import { useAuth } from '@/composables/auth'

createApp(App).use(router).use(store).mount('#app')
// createApp(App).use(router).mount('#app')