<script>
  import userCircleO from './icons/userCircleO.icon.svg'

  const iconMap = {
    userCircleO: userCircleO.id,
  }

  export default {
    props: {
      name: {
        type: String,
        required: true,
        validate: name => Object.keys(iconMap).includes(name),
      },
    },
    computed: {
      iconId () {
        return iconMap[this.name]
      },
    },
  }
</script>

<template>
  <svg class="icon">
    <use :xlink:href="`#${iconId}`" />
  </svg>
</template>

<style scoped>
  .icon {
    fill: currentColor;
  }
</style>
