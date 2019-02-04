import {
  getAllDocuments,
  addDocument,
  updateDocument,
  removeDocument,
  documentStore,
} from '@/lib/dataStoreClient'
import { find, filter } from 'lodash'
import router from '@/router'

export default {
  namespaced: true,
  state: {
    documents: null,
  },
  mutations: {
    setDocuments (state, documents) {
      state.documents = documents
    },
    updateDocument (state, newDocument) {
      state.documents = state.documents.map(comparisonDocument => {
        return comparisonDocument._id === newDocument._id ? newDocument : comparisonDocument
      })
    },
    addDocument (state, newDocument) {
      state.documents.push(newDocument)
    },
    removeDocument (state, documentToRemove) {
      state.documents = state.documents.filter(document => document._id !== documentToRemove)
    },
  },
  actions: {
    async fetchAndSubscribe ({ commit }) {
      const fetch = async () => {
        commit(`setDocuments`, await getAllDocuments())
      }

      documentStore.on(`change`, fetch)

      fetch()
    },

    async updateDocument ({ commit }, document) {
      commit(`updateDocument`, await updateDocument(document))
    },

    async createDocument ({ commit, getters, rootGetters }, categoryId) {
      const newDocument = await addDocument({
        title: ``,
        content: ``,
        category: categoryId,
      })

      commit(`addDocument`, newDocument)

      return newDocument
    },

    async createAndOpenDocument ({ commit, dispatch }, categoryId) {
      const newDocument = await dispatch(`createDocument`, categoryId)

      commit(`categories/expandCategory`, categoryId, { root: true })

      router.push({
        name: `library.document`,
        params: { documentId: newDocument._id },
      })
    },

    async createAndOpenDocumentInCurrentCategory ({ dispatch, getters, rootGetters }) {
      const getCurrentCategoryId = () => {
        const currentDocument = getters.getDocument(router.currentRoute.params.documentId)

        if (router.currentRoute.name === `library.document` && currentDocument) {
          return currentDocument.category
        } else {
          const firstCategory = rootGetters[`categories/firstCategory`]

          return firstCategory ? firstCategory._id : null
        }
      }

      dispatch(`createAndOpenDocument`, getCurrentCategoryId())
    },

    async removeDocument ({ commit }, document) {
      await removeDocument(document)

      return commit(`removeDocument`, document._id)
    },
  },
  getters: {
    documents: state => state.documents,
    documentsLoaded: state => state.documents !== null,
    getDocument: state => documentId => state.documents && find(state.documents, { _id: documentId }),
    getDocumentsForCategory: state => categoryId => state.documents && filter(state.documents, { category: categoryId }),
  },
}
