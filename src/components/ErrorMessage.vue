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
    <Icon
      name="exclamationCircleSolid"
      class="icon"
    />

    <slot />
  </div>
</template>

<script>
  import Icon from '@/components/Icon/Icon'

  export default {
    components: {
      Icon,
    },
  }
</script>
