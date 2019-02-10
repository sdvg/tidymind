export default {
  namespaced: true,
  state: {
    isSwitchPanelOpen: false,
    isCreateCategoryModalOpen: false,
    isRemoveDocumentModalOpen: false,
    isRenameCategoryModalOpen: false,
    isMoveDocumentOrCategoryModalOpen: null,
    createCategoryParentId: null,
    removeDocumentDocumentId: null,
    renameCategoryCategoryId: null,
    moveDocumentOrCategoryId: null,
    moveDocumentOrCategoryType: null,
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
    openMoveDocumentOrCategoryModal ({ commit }, { id, type }) {
      commit(`setIsMoveDocumentOrCategoryModalOpen`, true)
      commit(`setMoveDocumentOrCategoryId`, id)
      commit(`setMoveDocumentOrCategoryType`, type)
    },
    closeMoveDocumentOrCategoryModal ({ commit }) {
      commit(`setIsMoveDocumentOrCategoryModalOpen`, false)
      commit(`setMoveDocumentOrCategoryId`, null)
      commit(`setMoveDocumentOrCategoryType`, null)
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
    setIsMoveDocumentOrCategoryModalOpen (state, isMoveDocumentOrCategoryModalOpen) {
      state.isMoveDocumentOrCategoryModalOpen = isMoveDocumentOrCategoryModalOpen
    },
    setMoveDocumentOrCategoryId (state, moveDocumentOrCategoryId) {
      state.moveDocumentOrCategoryId = moveDocumentOrCategoryId
    },
    setMoveDocumentOrCategoryType (state, moveDocumentOrCategoryType) {
      state.moveDocumentOrCategoryType = moveDocumentOrCategoryType
    },
  },
}
