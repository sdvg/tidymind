export default {
  namespaced: true,
  state: {
    isCreateCategoryModalOpen: false,
  },
  mutations: {
    openCreateCategoryModal (state) {
      state.isCreateCategoryModalOpen = true
    },
    closeCreateCategoryModal (state) {
      state.isCreateCategoryModalOpen = false
    },
  },
}
