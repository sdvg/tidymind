<template>
  <div class="App">
    <router-view />

    <portal-target name="modals" />
  </div>
</template>

<style>
  .App {
    height: 100%;
    position: relative;
  }
</style>
