<style scoped>
  .button {
    position: relative;
  }

  .button:not(.plain) {
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

  .spinner-wrapper {
    position: absolute;
    top: 50%;
    left: var(--space-xs);
    transform: translateY(-50%);
    width: 16px;
    height: 16px;
  }
</style>

<template>
  <button
    :type="type"
    :title="title"
    :disabled="isDisabled"
    :class="{
      'button': true,
      'primary': theme === themes.PRIMARY,
      'accent': theme === themes.ACCENT,
      'plain': theme === themes.PLAIN,
      'is-loading': isLoading,
    }"
    @click="$emit(`onClick`)"
  >
    <div
      v-if="isLoading"
      class="spinner-wrapper"
    >
      <Spinner />
    </div>

    <slot>
      {{ title }}
    </slot>
  </button>
</template>

<script>
import Spinner from '../components/Spinner'

const themes = {
  PRIMARY: `primary`,
  ACCENT: `accent`,
  PLAIN: `plain`,
}

export default {
  components: {
    Spinner,
  },
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
    isDisabled: Boolean,
    isLoading: Boolean,
  },
  data () {
    return { themes }
  },
}
</script>
