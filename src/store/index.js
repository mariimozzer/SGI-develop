import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    flashMessage: null,
    flashMessageError: null

  },
  getters: {
  },
  mutations: {
    setFlashMessage(state, message) {
      state.flashMessage = message;
    },

    clearFlashMessage(state) {
      state.flashMessage = null;
     
    },

    setFlashMessageError(state,message){
      state.flashMessageError = message
    },
    clearFlashMessageError(state){
      state.flashMessageError = null;
    },
  },
  actions: {
  
    
  },
  modules: {
  }
})



