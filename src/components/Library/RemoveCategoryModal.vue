<script>
  import { mapState, mapActions, mapGetters } from 'vuex'
  import Button from '@/components/Button'
  import Modal from '@/components/Modal'
  import ModalContent from '@/components/ModalContent'
  import RemoveCategoryModalInquiry from './RemoveCategoryModalInquiry'

  export default {
    components: {
      Button,
      Modal,
      ModalContent,
      RemoveCategoryModalInquiry,
    },
    computed: {
      ...mapState(`library`, [`removeCategoryCategoryId`]),
      ...mapGetters(`categories`, [`getCategory`, `getAllChildren`]),
      ...mapGetters(`documents`, [`currentlyOpenDocument`]),
      category () {
        return this.getCategory(this.removeCategoryCategoryId)
      },
      allChildren () {
        return this.getAllChildren(this.category)
      },
      numberOfChildCategories () {
        return this.allChildren.categories.length
      },
      numberOfChildDocuments () {
        return this.allChildren.documents.length
      },
    },
    methods: {
      ...mapActions(`library`, [`closeRemoveCategoryModal`]),
      ...mapActions(`documents`, [`removeDocument`]),
      ...mapActions(`categories`, [`removeCategory`]),
      remove () {
        const { categories, documents } = this.allChildren

        documents.forEach(this.removeDocument)
        categories.forEach(this.removeCategory)
        this.removeCategory(this.category)

        this.closeRemoveCategoryModal()

        if (documents.includes(this.currentlyOpenDocument)) {
          this.$router.push({ name: `library` })
        }
      },
    },
  }
</script>

<template>
  <Modal @closeModal="closeRemoveCategoryModal">
    <ModalContent>
      <div class="RemoveCategoryModal">
        <h2 class="title">
          Please confirm
        </h2>

        <RemoveCategoryModalInquiry
          class="inquiry"
          :category="category"
          :numberOfChildCategories="numberOfChildCategories"
          :numberOfChildDocuments="numberOfChildDocuments"
        />

        <Button
          theme="accent"
          @onClick="remove"
        >
          Delete
        </Button>

        <Button
          class="button-abort"
          theme="secondary"
          @onClick="closeRemoveCategoryModal"
        >
          Abort
        </Button>
      </div>
    </ModalContent>
  </Modal>
</template>

<style scoped>
  .RemoveCategoryModal {
    padding: var(--space);
  }

  .title {
    margin-bottom: var(--space-xs);
    font-size: var(--font-size-xxxl);
    color: var(--color-accent);
  }

  .inquiry {
    margin: var(--space-xs) 0;
  }

  .button-abort {
    margin-left: var(--space-xxxs);
  }
</style>
