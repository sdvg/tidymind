export default {
  namespaced: true,
  state: {
    encryptionKey: null,
  },
  mutations: {
    setEncryptionKey (state, encryptionKey) {
      state.encryptionKey = encryptionKey
    },
  },
}
