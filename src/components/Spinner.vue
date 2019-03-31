<style scoped>
  @keyframes spin {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }

  .icon {
    animation: spin 1400ms linear infinite;
  }
</style>

<template>
  <Icon
    name="spinnerSolid"
    class="icon"
  />
</template>

<script>
  import Icon from '@/components/Icon/Icon'

  export default {
    components: {
      Icon,
    },
  }
</script>
