<template>
  <div class="App">
    <router-view />

    <portal-target
      name="appRoot"
      multiple
    />
  </div>
</template>

<style scoped>
  .App {
    height: 100%;
    position: relative;
  }
</style>
