<style>
  .Sidebar {
    display: flex;
    justify-content: space-between;
    flex-direction: column;
    background: var(--color-accent);
  }
</style>

<template>
  <aside class="Sidebar">
    <p v-if="isLoading">Loading...</p>

    <DocumentsList
      v-if="documents"
      :documents="documents"
    />

    <div class="actions">
      <Button
        title="New"
        @onClick="createDocument"
      />
    </div>
  </aside>
</template>

<script>
import Button from '../Button'
import DocumentsList from './DocumentsList'
import { createNamespacedHelpers } from 'vuex'

const { mapActions, mapGetters } = createNamespacedHelpers(`documents`)

export default {
  components: {
    Button,
    DocumentsList
  },
  mounted () {
    this.fetchAndSubscribe()
  },
  methods: mapActions([
    `fetchAndSubscribe`,
    `createDocument`
  ]),
  computed: {
    ...mapGetters([`documents`]),
    isLoading () {
      return this.documents === null
    }
  }
}
</script>
