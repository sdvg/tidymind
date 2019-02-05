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
  <IconBase class="icon">
    <IconSpinner />
  </IconBase>
</template>

<script>
  import IconBase from './icons/IconBase'
  import IconSpinner from './icons/IconSpinner'

  export default {
    components: {
      IconBase,
      IconSpinner,
    },
  }
</script>
