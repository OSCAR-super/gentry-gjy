import { createApp } from 'vue'
import App from './Login.vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import router from '../../router'
import store from '../../store'

createApp(App).use(store).use(router).use(ElementPlus).mount('#app')
