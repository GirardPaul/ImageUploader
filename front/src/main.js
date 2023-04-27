import { createApp } from 'vue'
import './style.css'
import Toast from './components/Toast.vue'
import App from './App.vue'
const app = createApp(App);
app.component('Toast', Toast)
app.mount('#app')
