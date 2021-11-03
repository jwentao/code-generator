import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isLeftDrag: false
  },
  mutations: {
    setLeftDragState (state, data: boolean) {
      state.isLeftDrag = data
    }
  },
  actions: {
  },
  modules: {
  }
})
