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

    <router-view></router-view>
  </div>
</template>

<script>
import Sidebar from './Sidebar'
import { mapActions } from 'vuex'

export default {
  components: { Sidebar },
  methods: {
    ...mapActions(`documents`, { fetchAndSubscribeDocuments: `fetchAndSubscribe` }),
    ...mapActions(`categories`, { fetchAndSubscribeCategories: `fetchAndSubscribe` })
  },
  mounted () {
    this.fetchAndSubscribeCategories()
    this.fetchAndSubscribeDocuments()
  }
}
</script>
