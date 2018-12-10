<style scoped>
  .ModalContent {
    width: 40vw;
    max-width: 600px;
    background: var(--color-text-light);
    border-radius: 3px;
    box-shadow: 0 0 5px 5px var(--color-text-dark);
  }
</style>

<template>
  <div class="ModalContent">
    <slot />
  </div>
</template>
