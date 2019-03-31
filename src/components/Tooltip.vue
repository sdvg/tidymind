<style scoped>
  .content {
    position: absolute;
    z-index: var(--z-index-tooltip);
  }
</style>

<template>
  <div>
    <button
      ref="trigger"
      @mouseover="open"
    >
      <slot name="trigger" />
    </button>

    <portal to="appRoot">
      <div
        v-if="isVisible"
        ref="content"
        :key="key"
        class="content"
        @click="close"
        @mouseleave="close"
      >
        <slot name="content" />
      </div>
    </portal>
  </div>
</template>

<script>
  import uuidv4 from 'uuid/v4'
  import eventBus from '@/lib/eventBus'

  const OPENED_EVENT_NAME = `Tooltip:opened`

  export default {
    data () {
      return {
        isVisible: false,
      }
    },
    computed: {
      key () {
        return uuidv4()
      },
    },
    mounted () {
      window.addEventListener(`resize`, this.onResize, { passive: true })
      window.addEventListener(`scroll`, this.onScroll, { passive: true })
    },
    beforeDestroy () {
      window.removeEventListener(`resize`, this.onResize)
      window.removeEventListener(`scroll`, this.onScroll)
      eventBus.$off(OPENED_EVENT_NAME, this.close)
    },
    methods: {
      open () {
        this.isVisible = true
        this.setPosition()
        this.$emit(`open`)

        /* Close when another tooltip opens */
        eventBus.$off(OPENED_EVENT_NAME, this.close)
        eventBus.$emit(OPENED_EVENT_NAME)
        eventBus.$on(OPENED_EVENT_NAME, this.close)
      },
      close () {
        this.isVisible = false
        this.$emit(`close`)
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
  }
</script>
