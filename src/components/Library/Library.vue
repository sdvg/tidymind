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

    <SwitchPanel
      v-if="isSwitchPanelOpen"
      @closePanel="closeSwitchPanel"
    />

    <CreateCategoryModal v-if="isCreateCategoryModalOpen" />
    <RemoveDocumentModal v-if="isRemoveDocumentModalOpen" />
  </div>
</template>

<script>
  import { mapActions, mapState } from 'vuex'
  import CreateCategoryModal from './CreateCategoryModal'
  import RemoveDocumentModal from './RemoveDocumentModal'
  import Sidebar from './Sidebar'
  import SwitchPanel from './SwitchPanel'
  import shortcuts from '../../mixins/shortcuts'

  export default {
    components: {
      CreateCategoryModal,
      RemoveDocumentModal,
      Sidebar,
      SwitchPanel,
    },
    mixins: [shortcuts],
    computed: {
      ...mapState(`library`, [
        `isSwitchPanelOpen`,
        `isCreateCategoryModalOpen`,
        `isRemoveDocumentModalOpen`,
      ]),
    },
    mounted () {
      this.fetchAndSubscribeCategories()
      this.fetchAndSubscribeDocuments()
    },
    methods: {
      ...mapActions(`documents`, { fetchAndSubscribeDocuments: `fetchAndSubscribe` }),
      ...mapActions(`categories`, { fetchAndSubscribeCategories: `fetchAndSubscribe` }),
      ...mapActions(`library`, [`toggleSwitchPanel`, `closeSwitchPanel`]),
    },
    shortcuts: {
      switchPanel () {
        this.toggleSwitchPanel()
      },
    },
  }
</script>
