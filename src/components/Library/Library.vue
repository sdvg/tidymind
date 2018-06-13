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
import { createNamespacedHelpers } from 'vuex'

const { mapActions: mapDocumentActions } = createNamespacedHelpers(`documents`)
const { mapActions: mapCategoriesActions } = createNamespacedHelpers(`categories`)

export default {
  components: { Sidebar },
  methods: {
    ...mapDocumentActions({ fetchAndSubscribeDocuments: `fetchAndSubscribe` }),
    ...mapCategoriesActions({ fetchAndSubscribeCategories: `fetchAndSubscribe` })
  },
  mounted () {
    this.fetchAndSubscribeCategories()
    this.fetchAndSubscribeDocuments()
  }
}
</script>
