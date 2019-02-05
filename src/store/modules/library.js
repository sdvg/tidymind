export default {
  namespaced: true,
  state: {
    isCreateCategoryModalOpen: false,
    createCategoryParentId: null,
  },
  actions: {
    openCreateCategoryModal ({ commit }, createCategoryParentId = null) {
      commit(`setIsCreateCategoryModalOpen`, true)
      commit(`setCreateCategoryParentId`, createCategoryParentId)
    },
    closeCreateCategoryModal ({ commit }) {
      commit(`setIsCreateCategoryModalOpen`, false)
      commit(`setCreateCategoryParentId`, null)
    },
  },
  mutations: {
    setIsCreateCategoryModalOpen (state, isCreateCategoryModalOpen) {
      state.isCreateCategoryModalOpen = isCreateCategoryModalOpen
    },
    setCreateCategoryParentId (state, createCategoryParentId) {
      state.createCategoryParentId = createCategoryParentId
    },
  },
}
