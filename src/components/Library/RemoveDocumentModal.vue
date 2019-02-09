<script>
  import { mapActions, mapState, mapGetters } from 'vuex'
  import Button from '../Button'
  import DocumentTitle from './DocumentTitle'
  import Modal from '../Modal'
  import ModalContent from '../ModalContent'

  export default {
    components: {
      Button,
      DocumentTitle,
      Modal,
      ModalContent,
    },
    computed: {
      ...mapState(`library`, [`removeDocumentDocumentId`]),
      ...mapGetters(`documents`, [`getDocument`]),
      documentToRemove () {
        return this.getDocument(this.removeDocumentDocumentId)
      },
    },
    methods: {
      ...mapActions(`library`, [`closeRemoveDocumentModal`]),
      ...mapActions(`documents`, [`removeDocument`]),
      remove () {
        const documentToRemove = this.documentToRemove // original reference will be deleted after closing modal

        this.closeRemoveDocumentModal()
        this.$router.push({ name: `library` })
        this.removeDocument(documentToRemove)
      },
    },
  }
</script>

<template>
  <Modal @closeModal="closeRemoveDocumentModal">
    <ModalContent>
      <div class="RemoveDocumentModal">
        <h2 class="title">Please confirm</h2>

        <p class="inquiry">
          Do you really want to delete
          <em class="document-title">
            <DocumentTitle :title="documentToRemove.title" />
          </em>?
        </p>

        <Button
          theme="accent"
          @onClick="remove"
        >
          Delete
        </Button>

        <Button
          class="button-abort"
          theme="secondary"
          @onClick="closeRemoveDocumentModal"
        >
          Abort
        </Button>
      </div>
    </ModalContent>
  </Modal>
</template>

<style scoped>
  .RemoveDocumentModal {
    padding: var(--space);
  }

  .title {
    font-size: var(--font-size-xxxl);
    color: var(--color-accent);
  }

  .inquiry {
    margin: var(--space-xs) 0;
  }

  .document-title {
    word-break: break-word;
  }

  .button-abort {
    margin-left: var(--space-xxxs);
  }
</style>
