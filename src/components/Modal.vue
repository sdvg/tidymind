<script>
  import shortcuts from '../mixins/shortcuts'

  export default {
    mixins: [shortcuts],
    methods: {
      closeModal () {
        this.$emit(`closeModal`)
      },
    },
    shortcuts: {
      esc () {
        this.closeModal()
      },
    },
  }
</script>

<template>
  <portal to="appRoot">
    <div class="Modal">
      <div
        class="modal-close-background"
        @click="closeModal"
      />
      <div class="modal-content">
        <slot />
      </div>
    </div>
  </portal>
</template>

<style scoped>
  .Modal {
    display: flex;
    justify-content: center;
    align-items: center;
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background: rgba(0, 0, 0, .75);
    overflow: auto;
    z-index: var(--z-index-modal);
  }

  .modal-close-background {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
  }

  .modal-content {
    position: relative; /* move above background */
    max-height: 100%;
  }
</style>
