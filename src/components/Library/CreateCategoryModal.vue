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
            label="Category Name"
            v-model="categoryTitle"
            ref="inputField"
            :hideLabel="true"
            :hasError="isInvalid"
            errorMessage="Please enter a category name."
            @blur="$v.categoryTitle.$touch()"
          />

          <Button
            class="button-create"
            theme="accent"
            type="submit"
            :isDisabled="isRequestPending"
            :isLoading="isRequestPending"
          >
            Create
          </Button>

          <Button
            class="button-abort"
            theme="secondary"
            @click.native="closeCreateCategoryModal"
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
import { mapMutations } from 'vuex'
import { validationMixin } from 'vuelidate'
import { required } from 'vuelidate/lib/validators'
import { addCategory } from '../../lib/dataStoreClient'

export default {
  mixins: [validationMixin],
  components: {
    Modal,
    ModalContent,
    Form,
    InputField,
    Button,
  },
  methods: {
    ...mapMutations(`library`, [`closeCreateCategoryModal`]),
    async createCategory () {
      const category = {
        parent: null,
        title: this.categoryTitle,
      }

      this.isRequestPending = true

      await addCategory(category)

      this.closeCreateCategoryModal()
      this.isRequestPending = false
    },
    handleSubmit () {
      this.$v.$touch()

      if (!this.$v.$invalid) {
        this.createCategory()
      }
    },
  },
  mounted () {
    setTimeout(() => {
      this.$refs.inputField && this.$refs.inputField.focusInput()
    })
  },
  data () {
    return {
      categoryTitle: ``,
      isRequestPending: false,
    }
  },
  computed: {
    isInvalid () {
      return this.$v.categoryTitle.$dirty && this.$v.categoryTitle.$invalid
    },
  },
  validations: {
    categoryTitle: { required },
  },
}
</script>
