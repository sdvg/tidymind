export default {
  namespaced: true,
  state: {
    isSwitchPanelOpen: false,
    isCreateCategoryModalOpen: false,
    isRemoveDocumentModalOpen: false,
    isRenameCategoryModalOpen: false,
    createCategoryParentId: null,
    removeDocumentDocumentId: null,
    renameCategoryCategoryId: null,
  },
  actions: {
    openSwitchPanel ({ commit }) {
      commit(`setIsSwitchPanelOpen`, true)
    },
    closeSwitchPanel ({ commit }) {
      commit(`setIsSwitchPanelOpen`, false)
    },
    toggleSwitchPanel ({ commit, state }) {
      commit(`setIsSwitchPanelOpen`, !state.isSwitchPanelOpen)
    },
    openCreateCategoryModal ({ commit }, createCategoryParentId = null) {
      commit(`setIsCreateCategoryModalOpen`, true)
      commit(`setCreateCategoryParentId`, createCategoryParentId)
    },
    closeCreateCategoryModal ({ commit }) {
      commit(`setIsCreateCategoryModalOpen`, false)
      commit(`setCreateCategoryParentId`, null)
    },
    openRemoveDocumentModal ({ commit }, documentId) {
      commit(`setIsRemoveDocumentModalOpen`, true)
      commit(`setRemoveDocumentDocumentId`, documentId)
    },
    closeRemoveDocumentModal ({ commit }) {
      commit(`setIsRemoveDocumentModalOpen`, false)
      commit(`setRemoveDocumentDocumentId`, null)
    },
    openRenameCategoryModal ({ commit }, categoryId) {
      commit(`setIsRenameCategoryModalOpen`, true)
      commit(`setRenameCategoryCategoryId`, categoryId)
    },
    closeRenameCategoryModal ({ commit }) {
      commit(`setIsRenameCategoryModalOpen`, false)
      commit(`setRenameCategoryCategoryId`, null)
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
    setIsRenameCategoryModalOpen (state, isRenameCategoryModalOpen) {
      state.isRenameCategoryModalOpen = isRenameCategoryModalOpen
    },
    setIsRemoveDocumentModalOpen (state, isRemoveDocumentModalOpen) {
      state.isRemoveDocumentModalOpen = isRemoveDocumentModalOpen
    },
    setRemoveDocumentDocumentId (state, removeDocumentDocumentId) {
      state.removeDocumentDocumentId = removeDocumentDocumentId
    },
    setRenameCategoryCategoryId (state, renameCategoryCategoryId) {
      state.renameCategoryCategoryId = renameCategoryCategoryId
    },
  },
}
