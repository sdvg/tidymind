import Vue from 'vue'
import Vuex from 'vuex'
import documents from './modules/documents'
import categories from './modules/categories'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    documents,
    categories
  },
  strict: process.env.NODE_ENV !== `production`
})
