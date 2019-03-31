<script>
  import { mapActions, mapState, mapGetters } from 'vuex'
  import { validationMixin } from 'vuelidate'
  import { required } from 'vuelidate/lib/validators'
  import Modal from '../Modal'
  import ModalContent from '../ModalContent'
  import InputField from '../formControls/InputField'
  import Button from '../Button'
  import { updateCategory } from '@/lib/dataStoreClient'

  export default {
    components: {
      Modal,
      ModalContent,
      InputField,
      Button,
    },
    mixins: [validationMixin],
    data () {
      return {
        categoryTitle: ``,
      }
    },
    computed: {
      ...mapState(`library`, [`renameCategoryCategoryId`]),
      ...mapGetters(`categories`, [`getCategory`]),
      isInvalid () {
        return this.$v.categoryTitle.$dirty && this.$v.categoryTitle.$invalid
      },
      category () {
        return this.getCategory(this.renameCategoryCategoryId)
      },
    },
    mounted () {
      this.categoryTitle = this.category.title

      setTimeout(() => {
        this.$refs.inputField && this.$refs.inputField.focusInput()
      })
    },
    methods: {
      ...mapActions(`library`, [`closeRenameCategoryModal`]),
      async renameCategory () {
        await updateCategory({
          ...this.category,
          title: this.categoryTitle,
        })
        this.closeRenameCategoryModal()
      },
      handleSubmit () {
        this.$v.$touch()

        if (!this.$v.$invalid) {
          this.renameCategory()
        }
      },
    },
    validations: {
      categoryTitle: { required },
    },
  }
</script>

<template>
  <Modal @closeModal="closeRenameCategoryModal">
    <ModalContent>
      <div class="RenameCategoryModal">
        <h2 class="title">
          Rename Category
        </h2>

        <form @submit.prevent="handleSubmit">
          <InputField
            ref="inputField"
            v-model="categoryTitle"
            :hideLabel="true"
            :hasError="isInvalid"
            label="Category Name"
            errorMessage="Please enter a category name."
            @blur="$v.categoryTitle.$touch()"
          />

          <Button
            class="button-rename"
            theme="accent"
            type="submit"
          >
            Rename
          </Button>

          <Button
            class="button-abort"
            theme="secondary"
            @onClick="closeRenameCategoryModal"
          >
            Abort
          </Button>
        </form>
      </div>
    </ModalContent>
  </Modal>
</template>

<style scoped>
  .RenameCategoryModal {
    padding: var(--space);
  }

  .title {
    margin-bottom: var(--space-xs);
    font-size: var(--font-size-xxxl);
    color: var(--color-accent);
  }

  .button-rename {
    margin-top: var(--space-xs);
  }

  .button-abort {
    margin-left: var(--space-xxxs);
  }
</style>
