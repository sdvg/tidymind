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
    <p v-if="!isDataLoaded">Loading...</p>

    <DocumentsList
      class="documentList"
      v-if="isDataLoaded"
    />

    <div>
      <CreateDocumentButton />
    </div>
  </aside>
</template>

<script>
import CreateDocumentButton from './CreateDocumentButton'
import DocumentsList from './DocumentsList'
import { mapActions, mapGetters } from 'vuex'

export default {
  components: {
    CreateDocumentButton,
    DocumentsList
  },
  methods: {
    ...mapActions(`documents`, [`createDocument`]),
    ...mapActions(`categories`, [`expandCategoriesForDocumentId`])
  },
  computed: {
    ...mapGetters(`documents`, [`documentsLoaded`]),
    ...mapGetters(`categories`, [`categoriesLoaded`]),
    isDataLoaded () {
      return this.documentsLoaded && this.categoriesLoaded
    }
  },
  watch: {
    isDataLoaded (isLoaded) {
      if (isLoaded && this.$route.params.documentId) {
        this.expandCategoriesForDocumentId(this.$route.params.documentId)
      }
    }
  }
}
</script>
