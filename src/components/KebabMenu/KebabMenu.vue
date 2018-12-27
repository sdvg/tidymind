<script>
import IconEllipsisV from '../icons/IconEllipsisV'
import IconBase from '../icons/IconBase'
import Tooltip from '../Tooltip'

export default {
  components: {
    IconBase,
    IconEllipsisV,
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
      <slot name="icon">
        <IconBase class="icon">
          <IconEllipsisV />
        </IconBase>
      </slot>
    </div>

    <div
      class="actions"
      slot="content"
    >
      <slot name="actions" />
    </div>
  </Tooltip>
</template>

<style scoped>
  .button {
    display: flex;
    align-items: center;
  }

  .icon {
    width: 16px;
    color: var(--color-text-light);
  }

  .actions {
    background: var(--color-dark);
    border-radius: 3px;
    box-shadow: 0 0 3px 0 var(--color-text-dark);
  }
</style>
