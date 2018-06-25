import {
  getAllDocuments,
  putDocument,
  removeDocument
} from '@/lib/dataStoreClient'
import { find, filter } from 'lodash'
import router from '@/router'

export default {
  namespaced: true,
  state: {
    documents: null
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
    }
  },
  actions: {
    async fetchAndSubscribe ({ commit }) {
      const fetch = async () => {
        const documents = await getAllDocuments()

        commit(`setDocuments`, documents)
      }

      // @todo
      // documentStore.on('change', fetch)

      fetch()
    },

    async updateDocument ({ commit }, document) {
      commit(`updateDocument`, await putDocument(document))
    },

    async createDocument ({ commit }) {
      const newDocument = await putDocument({ title: ``, content: `` })

      commit(`addDocument`, newDocument)

      router.push({
        name: `library.document`,
        params: { id: newDocument._id }
      })
    },

    removeDocument ({ commit }, document) {
      removeDocument(document)
      commit(`removeDocument`, document._id)
      router.push({ name: `library` })
    }
  },
  getters: {
    documents: state => state.documents,
    documentsLoaded: state => state.documents !== null,
    getDocument: state => documentId => state.documents && find(state.documents, { _id: documentId }),
    getDocumentsForCategory: state => categoryId => state.documents && filter(state.documents, { category: categoryId })
  }
}
