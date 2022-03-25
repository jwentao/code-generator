import Vue from 'vue'
import App from './App.vue'
// import router from './router'
// import store from './store'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

Vue.config.productionTip = false
Vue.use(ElementUI)

// 获取页面组件对象
// const viewsComponentObj = (() => {
//   const views = require.context('@/views', true, /^((?!componen).)+\.vue$/)
//   const viewsComponent = views.keys().map(v => {
//     views(v).default.file = v.replace('./', 'src/views/')
//     return views(v).default
//   })
//   const obj = {}
//   viewsComponent.forEach(v => {
//     obj[v.file] = v
//   })
//   return obj
// })()

// new Vue({
//   router,
//   store,
//   render: h => h(App)
// }).$mount('#app')

if (!window.__INJECTED_PUBLIC_PATH_BY_QIANKUN__) {
  new Vue({
    // router,
    // store,
    render: h => h(App)
  }).$mount('#app')
}

/**
 * bootstrap 只会在微应用初始化的时候调用一次，下次微应用重新进入时会直接调用 mount 钩子，不会再重复触发 bootstrap。
 * 通常我们可以在这里做一些全局变量的初始化，比如不会在 unmount 阶段被销毁的应用级别的缓存等。
 */
export async function bootstrap () {
  // 实时绑定微应用的host
  // eslint-disable-next-line
  __webpack_public_path__ = window.__INJECTED_PUBLIC_PATH_BY_QIANKUN__
}

let $vm = null
/**
 * 应用每次进入都会调用 mount 方法，通常我们在这里触发应用的渲染方法
 */
export async function mount (props) {
  const rootDiv = document.createElement('div')
  props.container.appendChild(rootDiv)

  $vm = new Vue({
    el: rootDiv,
    mounted () {
      if (props.mountCallBack) {
        props.mountCallBack(this)
      }
    },
    render: h => h(App)

  })
}

/**
 * 应用每次 切出/卸载 会调用的方法，通常在这里我们会卸载微应用的应用实例
 */
export async function unmount (props) {
  $vm.$destroy()
}
/**
 * 可选生命周期钩子，仅使用 loadMicroApp 方式加载微应用时生效
 */
export async function update (props) {
  console.log('update props', props)
}
