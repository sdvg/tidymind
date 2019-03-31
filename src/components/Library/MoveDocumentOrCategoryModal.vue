<script>
  import { mapActions, mapState, mapGetters } from 'vuex'
  import { updateDocument, updateCategory } from '@/lib/dataStoreClient'
  import Modal from '../Modal'
  import ModalContent from '../ModalContent'
  import Button from '../Button'

  export default {
    components: {
      Modal,
      ModalContent,
      Button,
    },
    data () {
      return {
        selectedCategoryId: null,
      }
    },
    computed: {
      ...mapState(`library`, [`moveDocumentOrCategoryId`, `moveDocumentOrCategoryType`]),
      ...mapGetters(`documents`, [`getDocument`]),
      ...mapGetters(`categories`, [`categoryTree`, `getCategory`]),
      categoryOptions () {
        const walkTree = (tree, depth) => {
          return tree.reduce((accumulator, currentValue) => {
            const currentItem = {
              categoryId: currentValue._id,
              label: currentValue.title,
              depth,
            }
            const children = currentValue.children ? walkTree(currentValue.children, depth + 1) : []

            return [
              ...accumulator,
              currentItem,
              ...children,
            ]
          }, [])
        }

        const topLevel = {
          categoryId: null,
          label: `Top level`,
          depth: 0,
        }

        return [
          topLevel,
          ...walkTree(this.categoryTree, 1),
        ]
      },
    },
    beforeMount () {
      if (this.moveDocumentOrCategoryType === `document`) {
        this.documentToMove = this.getDocument(this.moveDocumentOrCategoryId)
        this.selectedCategoryId = this.documentToMove.category
      } else if (this.moveDocumentOrCategoryType === `category`) {
        this.categoryToMove = this.getCategory(this.moveDocumentOrCategoryId)
        this.selectedCategoryId = this.categoryToMove.parent
      }
    },
    mounted () {
      setTimeout(() => {
        this.$refs.categorySelect && this.$refs.categorySelect.focus()
      })
    },
    methods: {
      ...mapActions(`library`, [`closeMoveDocumentOrCategoryModal`]),
      ...mapActions(`categories`, [`expandCategoriesRecursively`]),
      handleSubmit () {
        if (this.moveDocumentOrCategoryType === `document`) {
          updateDocument({
            ...this.documentToMove,
            category: this.selectedCategoryId,
          })
        } else if (this.moveDocumentOrCategoryType === `category`) {
          updateCategory({
            ...this.categoryToMove,
            parent: this.selectedCategoryId,
          })
        }

        const selectedCategory = this.getCategory(this.selectedCategoryId)

        if (selectedCategory) { // undefined for top level
          this.expandCategoriesRecursively(selectedCategory)
        }

        this.closeMoveDocumentOrCategoryModal()
      },
    },
  }
</script>

<template>
  <Modal @closeModal="closeMoveDocumentOrCategoryModal">
    <ModalContent>
      <div class="MoveDocumentOrCategoryModal">
        <h2 class="title">
          Move
          <template v-if="moveDocumentOrCategoryType === `document`">
            Document
          </template>
          <template v-if="moveDocumentOrCategoryType === `category`">
            Category
          </template>
        </h2>

        <p class="inquiry">
          Select new parent category:
        </p>

        <form @submit.prevent="handleSubmit">
          <select
            ref="categorySelect"
            v-model="selectedCategoryId"
            class="category-select"
          >
            <option
              v-for="option in categoryOptions"
              :key="option.categoryId"
              :value="option.categoryId"
            >
              <!-- eslint-disable-next-line vue/no-unused-vars -->
              <template v-for="depth in option.depth">
                &nbsp;&nbsp;&nbsp;&nbsp;
              </template>
              {{ option.label }}
            </option>
          </select>

          <Button
            class="button-move"
            theme="accent"
            type="submit"
          >
            Move
          </Button>

          <Button
            class="button-abort"
            theme="secondary"
            @onClick="closeMoveDocumentOrCategoryModal"
          >
            Abort
          </Button>
        </form>
      </div>
    </ModalContent>
  </Modal>
</template>

<style scoped>
  .MoveDocumentOrCategoryModal {
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

  .category-select {
    width: 100%;
  }

  .button-move {
    margin-top: var(--space-xs);
  }

  .button-abort {
    margin-left: var(--space-xxxs);
  }
</style>
