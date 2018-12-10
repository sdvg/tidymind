<template>
  <button class="KebabMenuAction">
    <slot />
  </button>
</template>

<style scoped>
  .KebabMenuAction {
    display: flex;
    width: 100%;
    padding: 4px 6px;
    color: var(--color-text-light);
    font-size: var(--font-size-s);
    white-space: nowrap;
  }

  .KebabMenuAction:not(:first-child) {
    border-top: 1px solid var(--color-gray);
  }
</style>
