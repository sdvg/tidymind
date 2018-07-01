<style scoped>
  .button {
    padding: 4px 8px;
    font-size: 12px;
  }

  .primary {
    background: lightblue;
    color: #1d1d1d;
  }
</style>

<template>
  <button
    :type="type"
    :title="title"
    :class="{
      button: true,
      primary: theme === themes.PRIMARY
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
  PRIMARY: `primary`
}

export default {
  props: {
    type: {
      type: String,
      default: `button`
    },
    title: {
      type: String,
      default: ``
    },
    theme: {
      type: String,
      default: `primary`,
      validator: value => Object.values(themes).includes(value)
    }
  },
  data () {
    return { themes }
  }
}
</script>
