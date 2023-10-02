import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    flashMessage: null,
    nomePessoa: null
  },
  getters: {
  },
  mutations: {
    setFlashMessage(state, message) {
      state.flashMessage = message;
    },
    setPessoaNome(state,nome){
      state.nomePessoa = nome;
    },


    clearFlashMessage(state) {
      state.flashMessage = null;
      state.nomePessoa = null;
    },
  },
  actions: {
  
    
  },
  modules: {
  }
})



