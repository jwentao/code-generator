import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    curConfig: [],
    globalId: 0
  },
  getters: {
  },
  mutations: {
    getGlobalId(state) {
      state.globalId++;
      return ++state.globalId;
    }
  },
  actions: {
  },
  modules: {
  }
});
