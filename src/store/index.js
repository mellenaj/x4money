import Vue from 'vue'
import Vuex from 'vuex'

import data from './products-and-filters/'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    data
  }
})

export default store
