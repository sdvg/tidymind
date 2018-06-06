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

export default {
  components: { Sidebar }
}
</script>
