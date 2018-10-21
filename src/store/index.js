import Vue from 'vue'
import Vuex from 'vuex'
import documents from './modules/documents'
import categories from './modules/categories'
import crypto from './modules/crypto'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    documents,
    categories,
    crypto,
  },
  strict: process.env.NODE_ENV !== `production`,
})
