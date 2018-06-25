<!-- based on https://markus.oberlehner.net/blog/transition-to-height-auto-with-vue/ -->

<style scoped>
  * {
    will-change: height;
    transform: translateZ(0);
    backface-visibility: hidden;
    perspective: 1000px;
  }

  .expand-enter-active,
  .expand-leave-active {
    transition: height 200ms ease-in-out;
    overflow: hidden;
  }

  .expand-enter,
  .expand-leave-to {
    height: 0;
  }
</style>

<template>
  <transition
    name="expand"
    @enter="enter"
    @after-enter="afterEnter"
    @leave="leave"
  >
    <slot />
  </transition>
</template>

<script>
export default {
  methods: {
    enter (element) {
      element.style.width = getComputedStyle(element).width
      element.style.position = `absolute`
      element.style.visibility = `hidden`
      element.style.height = `auto`

      const height = getComputedStyle(element).height

      element.style.width = null
      element.style.position = null
      element.style.visibility = null
      element.style.height = 0

      setTimeout(() => {
        element.style.height = height
      })
    },
    afterEnter (element) {
      element.style.height = `auto`
    },
    leave (element) {
      element.style.height = getComputedStyle(element).height

      setTimeout(() => {
        element.style.height = 0
      })
    }
  }
}
</script>
