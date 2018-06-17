<template>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    :viewBox="viewBox"
    role="presentation"
  >
    <g fill="currentColor">
      <slot />
    </g>
  </svg>
</template>

<script>
export default {
  props: {
    viewBox: {
      type: String,
      default: `0 0 1792 1792`
    }
  }
}
</script>
