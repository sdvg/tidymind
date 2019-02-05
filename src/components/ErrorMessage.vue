<style scoped>
  .ErrorMessage {
    display: flex;
    align-items: center;
    padding: var(--space-xxs);
    background: var(--color-error-dark);
    color: var(--color-text-light);
  }

  .icon {
    width: 22px;
    height: 22px;
    flex-shrink: 0;
    margin-right: var(--space-xxxs);
  }
</style>

<template>
  <div class="ErrorMessage">
    <IconBase class="icon">
      <IconExclamationCircle />
    </IconBase>

    <slot />
  </div>
</template>

<script>
  import IconBase from './icons/IconBase'
  import IconExclamationCircle from './icons/IconExclamationCircle'

  export default {
    components: {
      IconBase,
      IconExclamationCircle,
    },
  }
</script>
