<style>
  .Sidebar {
    background: var(--color-accent);
  }
</style>

<template>
  <aside class="Sidebar">
    <p v-if="isLoading">Loading...</p>

    <documents-list
      v-if="documents"
      :documents="documents"
    />
  </aside>
</template>

<script>
import DocumentsList from './DocumentsList'
import { createNamespacedHelpers } from 'vuex'

const { mapActions, mapGetters } = createNamespacedHelpers(`documents`)

export default {
  components: {
    'documents-list': DocumentsList
  },
  mounted () {
    this.fetchAndSubscribe()
  },
  methods: mapActions([`fetchAndSubscribe`]),
  computed: {
    ...mapGetters([`documents`]),
    isLoading () {
      return this.documents === null
    }
  }
}
</script>
