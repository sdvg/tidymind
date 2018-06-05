import {
  getAllDocuments,
  putDocument
} from '@/lib/dataStoreClient'

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
    }
  },
  getters: {
    documents: state => state.documents,
    getDocument: state => id => state.documents && state.documents.find(document => document._id === id)
  }
}
