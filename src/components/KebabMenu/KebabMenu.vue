<script>
  import Tooltip from '../Tooltip'
  import Icon from '@/components/Icon/Icon'

  const themes = {
    LIGHT: `light`,
    DARK: `dark`,
  }

  export default {
    components: {
      Icon,
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
  <Tooltip
    @open="$emit(`open`)"
    @close="$emit(`close`)"
  >
    <div
      slot="trigger"
      :class="{
        light: theme === themes.LIGHT,
        dark: theme === themes.DARK,
      }"
      class="KebabMenu"
    >
      <slot name="icon">
        <Icon
          name="ellipsisVSolid"
          class="icon"
        />
      </slot>
    </div>

    <div
      slot="content"
      class="actions"
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
    width: 13px;
    height: 13px;
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
