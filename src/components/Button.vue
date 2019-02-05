<style scoped>
  .button {
    position: relative;
  }

  .button[disabled] {
    opacity: .6;
    cursor: not-allowed;
  }

  .primary {
    font-size: var(--font-size-s);
    padding: var(--space-xxxxxs) var(--space-xxs);
    background: var(--color-dark);
    color: var(--color-gray);
    border-radius: 3px;
  }
  .primary:hover {
    background: var(--color-text-dark);
  }

  .accent,
  .accent-full {
    padding: var(--space-xs);
    font-size: var(--font-size);
    text-transform: uppercase;
    background: var(--color-accent);
    color: #fff;
    border-radius: 3px;
  }
  .accent:not([disabled]):hover,
  .accent:not([disabled]):focus,
  .accent-full:not([disabled]):hover,
  .accent-full:not([disabled]):focus,{
    background: var(--color-accent-dark);
  }

  .accent {
    transition: 100ms padding-left;
  }

  .accent.is-loading {
    padding-left: 35px;
  }

  .secondary {
    padding: var(--space-xs);
    font-size: var(--font-size);
    text-transform: uppercase;
    color: var(--color-accent);
    border-radius: 3px;
  }

  .secondary:hover {
    background: var(--color-gray-lighter);
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
      'secondary': theme === themes.SECONDARY,
      'accent': theme === themes.ACCENT,
      'accent-full': theme === themes.ACCENT_FULL,
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
    SECONDARY: `secondary`,
    ACCENT: `accent`,
    ACCENT_FULL: `accent-full`,
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
      isDisabled: {
        type: Boolean,
        default: false,
      },
      isLoading: {
        type: Boolean,
        default: false,
      },
    },
    data () {
      return { themes }
    },
  }
</script>
