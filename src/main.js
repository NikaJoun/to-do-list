import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import store from './store';

const app = createApp(App);

store.dispatch('loadTasks');

app.use(store);
app.mount('#app');
