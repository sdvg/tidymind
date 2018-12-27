<template>
  <div class="App">
    <router-view />

    <portal-target name="appRoot" />
  </div>
</template>

<style scoped>
  .App {
    height: 100%;
    position: relative;
  }
</style>
