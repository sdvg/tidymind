<style scoped>
  .Library {
    display: flex;
    height: 100%;
  }

  .sidebar {
    width: 300px;
  }
</style>

<template>
  <div class="Library">
    <Sidebar class="sidebar" />

    <router-view />

    <SwitchPanel v-if="isSwitchPanelOpen" />
    <RemoveDocumentModal v-if="isRemoveDocumentModalOpen" />
    <CreateCategoryModal v-if="isCreateCategoryModalOpen" />
    <RenameCategoryModal v-if="isRenameCategoryModalOpen" />
    <MoveDocumentOrCategoryModal v-if="isMoveDocumentOrCategoryModalOpen" />
    <RemoveCategoryModal v-if="isRemoveCategoryModalOpen" />
  </div>
</template>

<script>
  import { mapActions, mapState } from 'vuex'
  import CreateCategoryModal from './CreateCategoryModal'
  import MoveDocumentOrCategoryModal from './MoveDocumentOrCategoryModal'
  import RemoveDocumentModal from './RemoveDocumentModal'
  import RenameCategoryModal from './RenameCategoryModal'
  import RemoveCategoryModal from './RemoveCategoryModal'
  import Sidebar from './Sidebar'
  import SwitchPanel from './SwitchPanel'
  import shortcuts from '@/mixins/shortcuts'

  export default {
    components: {
      CreateCategoryModal,
      MoveDocumentOrCategoryModal,
      RemoveDocumentModal,
      RenameCategoryModal,
      RemoveCategoryModal,
      Sidebar,
      SwitchPanel,
    },
    mixins: [shortcuts],
    computed: {
      ...mapState(`library`, [
        `isSwitchPanelOpen`,
        `isRemoveDocumentModalOpen`,
        `isCreateCategoryModalOpen`,
        `isRenameCategoryModalOpen`,
        `isMoveDocumentOrCategoryModalOpen`,
        `isRemoveCategoryModalOpen`,
      ]),
    },
    mounted () {
      this.fetchAndSubscribeCategories()
      this.fetchAndSubscribeDocuments()
    },
    methods: {
      ...mapActions(`documents`, { fetchAndSubscribeDocuments: `fetchAndSubscribe` }),
      ...mapActions(`categories`, { fetchAndSubscribeCategories: `fetchAndSubscribe` }),
      ...mapActions(`library`, [`toggleSwitchPanel`]),
    },
    shortcuts: {
      switchPanel () {
        this.toggleSwitchPanel()
      },
    },
  }
</script>
