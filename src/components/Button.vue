<style scoped>
  .button {
    padding: var(--space-xs);
    font-size: var(--font-size);
    text-transform: uppercase;
  }

  .button[disabled] {
    opacity: .6;
    cursor: not-allowed;
  }

  .primary {
    background: lightblue;
    color: #1d1d1d;
  }

  .accent {
    background: var(--color-accent);
    color: #fff;
  }
  .accent:not([disabled]):hover,
  .accent:not([disabled]):focus {
    background: var(--color-accent-dark);
  }
</style>

<template>
  <button
    :type="type"
    :title="title"
    :disabled="isDisabled"
    :class="{
      button: true,
      primary: theme === themes.PRIMARY,
      accent: theme === themes.ACCENT,
    }"
    @click="$emit(`onClick`)"
  >
    <slot>
      {{ title }}
    </slot>
  </button>
</template>

<script>
const themes = {
  PRIMARY: `primary`,
  ACCENT: `accent`,
}

export default {
  props: {
    type: {
      type: String,
      default: `button`,
    },
    title: {
      type: String,
      default: ``,
    },
    theme: {
      type: String,
      default: `primary`,
      validator: value => Object.values(themes).includes(value),
    },
    isDisabled: {
      type: Boolean,
      default: false,
    },
  },
  data () {
    return { themes }
  },
}
</script>
