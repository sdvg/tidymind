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
      class="actions-wrapper"
      v-if="isOpen"
    >
      <div class="actions">
        <slot />
      </div>
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

  .actions-wrapper {
    /* add some padding for increased clicking/hover area */
    --surrounding-left: 16px;
    --surrounding-top: 10px;

    position: absolute;
    top: 100%;
    left: 100%;
    margin-top: calc(-8px - var(--surrounding-top));
    padding-top: var(--surrounding-top);
    margin-left: calc(var(--surrounding-left) * -1);
    padding-left: var(--surrounding-left);
  }

  .actions {
    background: var(--color-dark);
    border-radius: 3px;
    box-shadow: 0 0 3px 0 var(--color-text-dark);
  }
</style>
