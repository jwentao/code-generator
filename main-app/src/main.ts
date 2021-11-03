import { createApp } from 'vue'
import App from './App.vue'
import { registerMicroApps, start, loadMicroApp } from 'qiankun'
import { actions } from "./store";

const mircoApps = [
    {
        name: 'vue2-ele',
        entry: '//127.0.0.1:7301',
        activeRule: '/vue2-ele',
        container: "#render-view",
        props: {
            getGlobalState: actions.getGlobalState
        }
    }
]
registerMicroApps(mircoApps);
start();
loadMicroApp({
    name: 'vue2-ele',
    entry: '//127.0.0.1/:7301',
    container: '#render-view',
  });

createApp(App).mount('#app')
