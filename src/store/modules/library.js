export default {
  namespaced: true,
  state: {
    isSwitchPanelOpen: false,
    isCreateCategoryModalOpen: false,
    createCategoryParentId: null,
  },
  actions: {
    openSwitchPanel ({ commit }) {
      commit(`setIsSwitchPanelOpen`, true)
    },
    closeSwitchPanel ({ commit }) {
      commit(`setIsSwitchPanelOpen`, false)
    },
    toggleSwitchPanel ({ commit, state }) {
      commit(`setIsSwitchPanelOpen`, !state.setIsSwitchPanelOpen)
    },
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
    setIsSwitchPanelOpen (state, isSwitchPanelOpen) {
      state.isSwitchPanelOpen = isSwitchPanelOpen
    },
  },
}
