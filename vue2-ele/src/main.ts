import './public-path.ts'
import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App.vue'
import routes from './router'
import store from './store'

Vue.config.productionTip = false

let router = null
let instance: any = null

function render (props: any) {
  const { container } = props
  console.log(props)
  router = new VueRouter({
    base: '/',
    mode: 'history',
    routes
  })

  instance = new Vue({
    router,
    store,
    render: (h) => h(App)
  }).$mount(container ? container.querySelector('#app') : '#app')
}

if (!(window as any).__POWERED_BY_QIANKUN__) {
  render({})
}

function storeTest (props: any) {
  props.onGlobalStateChange &&
    props.onGlobalStateChange(
      (value: any, prev: any) => {
        store.commit('setLeftDragState', value.isLeftDrag)
      }
    )
  props.setGlobalState &&
    props.setGlobalState({
      ignore: props.name,
      user: {
        name: props.name
      }
    })
}

export async function bootstrap () {
  console.log('[vue] vue app bootstraped')
}

export async function mount (props: any) {
  console.log('[vue] props from main framework', props)
  storeTest(props)
  render(props)
}

export async function unmount () {
  instance.$destroy()
  instance.$el.innerHTML = ''
  instance = null
  router = null
}
