import { getAllCategories } from '@/lib/dataStoreClient'
import { cloneDeep, find } from 'lodash'

export default {
  namespaced: true,
  state: {
    categories: null
  },
  mutations: {
    setCategories (state, categories) {
      state.categories = categories
    }
  },
  actions: {
    async fetchAndSubscribe ({ commit }) {
      // @todo subscribe to changes
      commit(`setCategories`, await getAllCategories())
    }
  },
  getters: {
    categoryTree: ({ categories: inputCategories }) => {
      const categories = cloneDeep(inputCategories)
      const tree = []

      categories.forEach(category => {
        if (category.parent === null) {
          tree.push(category)
        } else {
          const parent = find(categories, { _id: category.parent })

          parent.children = parent.children || []
          parent.children.push(category)
        }
      })

      return tree
    }
  }
}
