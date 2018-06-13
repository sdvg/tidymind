<style>
  .Sidebar {
    display: flex;
    justify-content: space-between;
    flex-direction: column;
    background: var(--color-accent);
  }

  .documentList {
    margin: 8px 0;
    overflow: auto;
  }
</style>

<template>
  <aside class="Sidebar">
    <p v-if="!documentsLoaded">Loading...</p>

    <DocumentsList
      class="documentList"
      v-if="documentsLoaded"
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
  methods: mapActions([`createDocument`]),
  computed: mapGetters([`documentsLoaded`])
}
</script>
