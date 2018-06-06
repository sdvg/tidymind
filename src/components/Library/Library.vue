<style scoped>
  .Library {
    display: flex;
    height: 100%;
  }

  .sidebar {
    width: 300px;
    background: var(--color-accent);
  }
</style>

<template>
  <div class="Library">
    <aside class="sidebar">
      <p v-if="isLoading">Loading...</p>

      <documents-list
        v-if="documents"
        :documents="documents"
      />
    </aside>

    <router-view></router-view>
  </div>
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
