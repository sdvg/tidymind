<script>
export default {
  props: {
    label: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      default: `text`,
    },
    hideLabel: {
      type: Boolean,
      default: false,
    },
    hasError: {
      type: Boolean,
      default: false,
    },
    errorMessage: {
      type: String,
      default: null,
    },
    value: {
      type: String,
      default: ``,
    },
    attributes: {
      type: Object,
      default: () => ({}),
    },
  },
  methods: {

    /**
     * @public
     */
    focusInput () {
      this.$refs.inputElement.focus()
    },
  },
}
</script>

<template>
  <label
    :class="{ 'has-error': hasError }"
    class="InputField"
  >
    <span
      :class="{ 'visually-hidden': hideLabel }"
      class="label"
    >
      {{ label }}
    </span>

    <input
      ref="inputElement"
      :type="type"
      :value="value"
      v-bind="attributes"
      class="input"
      @input="$emit(`input`, $event.target.value)"
      @blur="$emit(`blur`, $event)"
    >

    <div
      v-if="hasError"
      class="error-message"
    >
      {{ errorMessage }}
    </div>
  </label>
</template>

<style scoped>
  .InputField {
    display: flex;
    flex-direction: column;
  }

  .label {
    text-transform: uppercase;
    color: var(--color-text);
  }

  .input {
    border: 2px solid var(--color-gray);
    font-size: var(--font-size-l);
    padding: var(--space-xxxxxs);
  }

  .input:focus {
    border-color: var(--color-primary);
    outline: none;
  }

  .has-error .input {
    border-color: var(--color-error);
  }

  .error-message {
    margin-top: var(--space-xxxxxxs);
    color: var(--color-error);
    font-size: var(--font-size-s);
  }
</style>
