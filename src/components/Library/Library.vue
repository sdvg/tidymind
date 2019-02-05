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
      v-if="hasSwitchPanel"
      @closePanel="closeSwitchPanel"
    />

    <CreateCategoryModal v-if="isCreateCategoryModalOpen" />
  </div>
</template>

<script>
import Sidebar from './Sidebar'
import SwitchPanel from './SwitchPanel'
import CreateCategoryModal from './CreateCategoryModal'
import shortcuts from '../../mixins/shortcuts'
import { mapActions, mapState } from 'vuex'

export default {
  components: {
    Sidebar,
    SwitchPanel,
    CreateCategoryModal,
  },
  mixins: [shortcuts],
  data () {
    return {
      hasSwitchPanel: false,
    }
  },
  computed: {
    ...mapState(`library`, [`isCreateCategoryModalOpen`]),
  },
  mounted () {
    this.fetchAndSubscribeCategories()
    this.fetchAndSubscribeDocuments()
  },
  methods: {
    ...mapActions(`documents`, { fetchAndSubscribeDocuments: `fetchAndSubscribe` }),
    ...mapActions(`categories`, { fetchAndSubscribeCategories: `fetchAndSubscribe` }),
    closeSwitchPanel () {
      this.hasSwitchPanel = false
    },
    toggleSwitchPanel () {
      this.hasSwitchPanel = !this.hasSwitchPanel
    },
  },
  shortcuts: {
    switchPanel () {
      this.toggleSwitchPanel()
    },
  },
}
</script>
