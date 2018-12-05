import {
  getAllCategories,
  categoryStore,
} from '@/lib/dataStoreClient'
import { cloneDeep, find, get, without } from 'lodash'

export default {
  namespaced: true,
  state: {
    categories: null,
    expandedCategories: [],
  },
  mutations: {
    setCategories (state, categories) {
      state.categories = categories
    },
    expandCategory (state, categoryId) {
      if (!state.expandedCategories.includes(categoryId)) {
        state.expandedCategories.push(categoryId)
      }
    },
    collapseCategory (state, categoryId) {
      state.expandedCategories = without(state.expandedCategories, categoryId)
    },
  },
  actions: {
    async fetchAndSubscribe ({ commit }) {
      const fetch = async () => {
        commit(`setCategories`, await getAllCategories())
      }

      categoryStore.on(`change`, fetch)

      fetch()
    },
    expandCategoriesRecursively ({ commit, state }, category) {
      const expandRecursive = category => {
        commit(`expandCategory`, category._id)

        if (category.parent) {
          expandRecursive(find(state.categories, { _id: category.parent }))
        }
      }

      expandRecursive(category)
    },
    expandCategoriesForDocumentId ({ commit, dispatch, state, rootGetters }, documentId) {
      const getDocumentsForCategory = rootGetters[`documents/getDocumentsForCategory`]
      const isDocumentInCategory = category => {
        const documentsInCategory = getDocumentsForCategory(category._id)

        return documentsInCategory && documentsInCategory.map(document => document._id).includes(documentId)
      }

      const documentsCategory = state.categories.find(isDocumentInCategory)

      if (documentsCategory) {
        dispatch(`expandCategoriesRecursively`, documentsCategory)
      }
    },
    toggleCategoryExpansion ({ commit, state, getters }, categoryId) {
      if (getters.isCategoryExpanded(categoryId)) {
        commit(`collapseCategory`, categoryId)
      } else {
        commit(`expandCategory`, categoryId)
      }
    },
  },
  getters: {
    categoriesLoaded: state => state.categories !== null,
    categoryTree: ({ categories: inputCategories }) => {
      const categories = inputCategories ? cloneDeep(inputCategories) : []
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
    },
    isCategoryExpanded: state => categoryId => state.expandedCategories.includes(categoryId),
    firstCategory: state => get(state, `categories[0]`, null),
  },
}
