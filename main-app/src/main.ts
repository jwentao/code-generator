import { createApp } from 'vue'
import App from './App.vue'
import { registerMicroApps, start, loadMicroApp } from 'qiankun'

const mircoApps = [
    {
        name: 'vue2-ele',
        entry: '//localhost:8080',
        activeRule: '/vue2-ele',
        container: "#render-view"
    }
]
registerMicroApps(mircoApps);
start();
loadMicroApp({
    name: 'vue2-ele',
    entry: '//localhost/:8080',
    container: '#render-view',
  });

createApp(App).mount('#app')
