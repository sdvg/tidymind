<template>
  <ol>
    <Category
      v-for="category of categoryTree"
      :key="category._id"
      :category="category"
      :depth="0"
    />
  </ol>
</template>

<script>
import { createNamespacedHelpers } from 'vuex'
import Category from './Category'

const { mapGetters } = createNamespacedHelpers(`categories`)

export default {
  components: { Category },
  computed: mapGetters([`categoryTree`]),
}
</script>
