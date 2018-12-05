import {
  getAllDocuments,
  addDocument,
  updateDocument,
  removeDocument,
  documentStore,
} from '@/lib/dataStoreClient'
import { find, filter } from 'lodash'

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
