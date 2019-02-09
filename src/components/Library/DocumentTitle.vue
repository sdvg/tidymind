<script>
  export default {
    props: {
      title: {
        type: String,
        required: true,
      },
    },
  }
</script>

<template>
  <span>
    <template v-if="title">{{ title }}</template>
    <template v-else><i>Unnamed document</i></template>
  </span>
</template>
