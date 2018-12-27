<script>
import IconEllipsisV from '../icons/IconEllipsisV'
import IconBase from '../icons/IconBase'
import Tooltip from '../Tooltip'

const themes = {
  LIGHT: `light`,
  DARK: `dark`,
}

export default {
  components: {
    IconBase,
    IconEllipsisV,
    Tooltip,
  },
  props: {
    theme: {
      type: String,
      default: themes.LIGHT,
      validator: value => Object.values(themes).includes(value),
    },
  },
  data () {
    return {
      themes,
    }
  },
}
</script>

<template>
  <Tooltip>
    <div
      class="KebabMenu"
      slot="trigger"
      :class="{
        light: theme === themes.LIGHT,
        dark: theme === themes.DARK,
      }"
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
  .KebabMenu {
    display: flex;
    align-items: center;
  }

  .icon {
    width: 16px;
  }

  .KebabMenu.light .icon {
    color: var(--color-text-light);
  }

  .KebabMenu.dark .icon {
    color: var(--color-text-dark);
  }

  .actions {
    background: var(--color-dark);
    border-radius: 3px;
    box-shadow: 0 0 3px 0 var(--color-text-dark);
  }
</style>
