<style scoped>
  .content {
    position: absolute;
    z-index: var(--z-index-tooltip);
  }
</style>

<template>
  <div @mouseleave="close">
    <button
      ref="trigger"
      @mouseover="open"
    >
      <slot name="trigger"/>
    </button>

    <div
      v-if="isVisible"
      ref="content"
      class="content"
    >
      <slot name="content"/>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      isVisible: false,
    }
  },
  methods: {
    open () {
      this.isVisible = true
      this.setPosition()
    },
    close () {
      this.isVisible = false
    },
    setPosition () {
      setTimeout(() => {
        const triggerElement = this.$refs.trigger
        const contentElement = this.$refs.content
        const {
          top,
          left,
          height,
          width,
        } = triggerElement.getBoundingClientRect()
        const contentTop = top + window.scrollY
        const contentLeft = left + window.scrollX

        contentElement.style.top = `${contentTop}px`
        contentElement.style.left = `${contentLeft}px`
        contentElement.style.padding = `${height}px 0 0 ${width}px`
      })
    },
    onResize () {
      this.close()
    },
    onScroll () {
      this.close()
    },
  },
  mounted () {
    window.addEventListener(`resize`, this.onResize, { passive: true })
    window.addEventListener(`scroll`, this.onScroll, { passive: true })
  },
  beforeDestroy () {
    window.removeEventListener(`resize`, this.onResize)
    window.removeEventListener(`scroll`, this.onScroll)
  },
}
</script>
