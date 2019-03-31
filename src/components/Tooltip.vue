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
      @click="open"
    >
      <slot name="trigger" />
    </button>

    <portal to="appRoot">
      <div
        v-if="isVisible"
        ref="content"
        :key="key"
        class="content"
      >
        <slot name="content" />
      </div>
    </portal>
  </div>
</template>

<script>
  import uuidv4 from 'uuid/v4'
  import eventBus, { events } from '@/lib/eventBus'

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
      eventBus.$on(events.IFRAME_CLICK, this.onIframeClick)
    },
    beforeDestroy () {
      window.removeEventListener(`resize`, this.onResize)
      window.removeEventListener(`scroll`, this.onScroll)
      window.removeEventListener(`click`, this.onDocumentClick)
      eventBus.$off(events.IFRAME_CLICK, this.onIframeClick)
    },
    methods: {
      open () {
        this.isVisible = true
        this.setPosition()
        this.$emit(`open`)

        window.addEventListener(`click`, this.onDocumentClick)
      },
      close () {
        this.isVisible = false
        this.$emit(`close`)
        window.removeEventListener(`click`, this.onDocumentClick)
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
      onIframeClick() {
        this.close()
      },
      onDocumentClick (event) {
        if (!this.$refs.trigger.contains(event.target)) {
          this.close()
        }
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
