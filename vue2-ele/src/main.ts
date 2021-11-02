import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import VueRouter from "vue-router"

Vue.config.productionTip = false
let router: any
let instance: any

function render(props: any) {
  const { container } = props;
  router = new VueRouter({
    base: "/",
    mode: "history",
    routes: router
  });

  instance = new Vue({
    router,
    store,
    render: (h) => h(App),
  }).$mount(container ? container.querySelector("#app") : "#app");
}

if (!window.__POWERED_BY_QIANKUN__) {
  render({});
}

function storeTest(props: any) {
  props.onGlobalStateChange &&
    props.onGlobalStateChange(
      (value: any, prev: any) =>
        console.log(`[onGlobalStateChange - ${props.name}]:`, value, prev),
      true
    );
  props.setGlobalState &&
    props.setGlobalState({
      ignore: props.name,
      user: {
        name: props.name,
      },
    });
}

export async function bootstrap() {
  console.log("[vue] vue app bootstraped");
}

export async function mount(props: any) {
  console.log("[vue] props from main framework", props);
  storeTest(props);
  render(props);
}

export async function unmount() {
  instance.$destroy();
  instance.$el.innerHTML = "";
  instance = null;
  router = null;
}
