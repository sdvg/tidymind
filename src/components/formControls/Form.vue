<template>
  <form
    class="Form"
    novalidate
    @submit.prevent="$emit(`submit`)"
  >
    <slot />
  </form>
</template>

<style scoped>
  .Form {
    display: flex;
    flex-direction: column;
  }

  .Form >>> .InputField:not(:first-child) {
    margin-top: var(--space-s);
  }
</style>
