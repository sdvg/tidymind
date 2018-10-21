<style>
  .Sidebar {
    display: flex;
    flex-direction: column;
    background: var(--color-accent);
  }

  .documentList {
    margin: var(--space-xxxs) 0;
    overflow: auto;
  }

  .actions {
    margin-top: auto;
  }
</style>

<template>
  <aside class="Sidebar">
    <AccountStatus />

    <p v-if="!isDataLoaded">Loading...</p>

    <DocumentsList
      class="documentList"
      v-if="isDataLoaded"
    />

    <div class="actions">
      <CreateDocumentButton />
    </div>
  </aside>
</template>

<script>
import CreateDocumentButton from './CreateDocumentButton'
import DocumentsList from './DocumentsList'
import AccountStatus from './AccountStatus'
import { mapActions, mapGetters } from 'vuex'

export default {
  components: {
    AccountStatus,
    CreateDocumentButton,
    DocumentsList,
  },
  methods: {
    ...mapActions(`documents`, [`createDocument`]),
    ...mapActions(`categories`, [`expandCategoriesForDocumentId`]),
  },
  computed: {
    ...mapGetters(`documents`, [`documentsLoaded`]),
    ...mapGetters(`categories`, [`categoriesLoaded`]),
    isDataLoaded () {
      return this.documentsLoaded && this.categoriesLoaded
    },
  },
  watch: {
    isDataLoaded (isLoaded) {
      if (isLoaded && this.$route.params.documentId) {
        this.expandCategoriesForDocumentId(this.$route.params.documentId)
      }
    },
  },
}
</script>
