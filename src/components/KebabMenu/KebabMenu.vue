<script>
import EllipsisV from '../icons/EllipsisV'
import IconBase from '../icons/IconBase'
import Tooltip from '../Tooltip'

export default {
  components: {
    IconBase,
    EllipsisV,
    Tooltip,
  },
}
</script>

<template>
  <Tooltip>
    <div
      class="button"
      slot="trigger"
    >
      <IconBase class="icon">
        <EllipsisV />
      </IconBase>
    </div>

    <div
      class="actions"
      slot="content"
    >
      <slot />
    </div>
  </Tooltip>
</template>

<style scoped>
  .button {
    display: flex;
    align-items: center;
  }

  .icon {
    width: 18px;
    color: var(--color-text-light);
  }

  .actions {
    background: var(--color-dark);
    border-radius: 3px;
    box-shadow: 0 0 3px 0 var(--color-text-dark);
  }
</style>
