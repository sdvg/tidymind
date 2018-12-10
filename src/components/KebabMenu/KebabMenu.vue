<script>
import EllipsisV from '../icons/EllipsisV'
import IconBase from '../icons/IconBase'

export default {
  components: {
    IconBase,
    EllipsisV,
  },
  data () {
    return {
      isOpen: false,
    }
  },
}
</script>

<template>
  <div
    class="KebabMenu"
    @mouseleave="isOpen = false"
  >
    <button
      class="button"
      @mouseover="isOpen = true"
    >
      <IconBase class="icon">
        <EllipsisV />
      </IconBase>
    </button>

    <div
      v-if="isOpen"
      class="actions"
    >
      <slot />
    </div>
  </div>
</template>

<style scoped>
  .KebabMenu {
    position: relative;
    z-index: var(--z-index-base);
  }

  .button {
    display: flex;
    align-items: center;
  }

  .icon {
    width: 18px;
    color: var(--color-text-light);
  }

  .actions {
    position: absolute;
    top: 100%;
    left: 100%;
    margin-top: -8px;
    background: var(--color-dark);
    border-radius: 3px;
  }
</style>
