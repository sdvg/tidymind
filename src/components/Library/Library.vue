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
  </div>
</template>

<script>
import Sidebar from './Sidebar'
import SwitchPanel from './SwitchPanel'
import shortcuts from '../../mixins/shortcuts'
import { mapActions } from 'vuex'

export default {
  mixins: [shortcuts],
  components: {
    Sidebar,
    SwitchPanel,
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
  data () {
    return {
      hasSwitchPanel: false,
    }
  },
  mounted () {
    this.fetchAndSubscribeCategories()
    this.fetchAndSubscribeDocuments()
  },
  shortcuts: {
    esc () {
      this.closeSwitchPanel()
    },
    switchPanel () {
      this.toggleSwitchPanel()
    },
  },
}
</script>
