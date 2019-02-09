<style scoped>
  .CreateCategoryModal {
    padding: var(--space);
  }

  .title {
    margin-bottom: var(--space-xs);
    font-size: var(--font-size-xxxl);
    color: var(--color-accent);
  }

  .button-create {
    margin-top: var(--space-xs);
  }

  .button-abort {
    margin-left: var(--space-xxxs);
  }
</style>

<template>
  <Modal @closeModal="closeCreateCategoryModal">
    <ModalContent>
      <div class="CreateCategoryModal">
        <h2 class="title">Create Category</h2>

        <form @submit.prevent="handleSubmit">
          <InputField
            ref="inputField"
            v-model="categoryTitle"
            :hide-label="true"
            :has-error="isInvalid"
            label="Category Name"
            error-message="Please enter a category name."
            @blur="$v.categoryTitle.$touch()"
          />

          <Button
            :isDisabled="isRequestPending"
            :isLoading="isRequestPending"
            class="button-create"
            theme="accent"
            type="submit"
          >
            Create
          </Button>

          <Button
            class="button-abort"
            theme="secondary"
            @onClick="closeCreateCategoryModal"
          >
            Abort
          </Button>
        </form>
      </div>
    </ModalContent>
  </Modal>
</template>

<script>
  import Modal from '../Modal'
  import ModalContent from '../ModalContent'
  import Form from '../formControls/Form'
  import InputField from '../formControls/InputField'
  import Button from '../Button'
  import { mapActions, mapState } from 'vuex'
  import { validationMixin } from 'vuelidate'
  import { required } from 'vuelidate/lib/validators'
  import { addCategory } from '../../lib/dataStoreClient'

  export default {
    components: {
      Modal,
      ModalContent,
      Form,
      InputField,
      Button,
    },
    mixins: [validationMixin],
    data () {
      return {
        categoryTitle: ``,
        isRequestPending: false,
      }
    },
    computed: {
      ...mapState(`library`, [`createCategoryParentId`]),
      isInvalid () {
        return this.$v.categoryTitle.$dirty && this.$v.categoryTitle.$invalid
      },
    },
    mounted () {
      setTimeout(() => {
        this.$refs.inputField && this.$refs.inputField.focusInput()
      })
    },
    methods: {
      ...mapActions(`library`, [`closeCreateCategoryModal`]),
      ...mapActions(`categories`, [`expandCategoriesRecursively`]),
      async createCategory () {
        const category = {
          parent: this.createCategoryParentId,
          title: this.categoryTitle,
        }

        this.isRequestPending = true

        const addedCategory = await addCategory(category)

        this.isRequestPending = false
        this.closeCreateCategoryModal()
        this.expandCategoriesRecursively(addedCategory)
      },
      handleSubmit () {
        this.$v.$touch()

        if (!this.$v.$invalid) {
          this.createCategory()
        }
      },
    },
    validations: {
      categoryTitle: { required },
    },
  }
</script>
