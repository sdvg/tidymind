<script>
import router from '../../router'
import Button from '@/components/Button'
import ErrorMessage from '@/components/ErrorMessage'
import Form from '@/components/formControls/Form'
import hoodie from '@/lib/hoodie'
import IconAngleLeft from '@/components/icons/IconAngleLeft'
import IconBase from '@/components/icons/IconBase'
import InputField from '@/components/formControls/InputField'
import { validationMixin } from 'vuelidate'
import { required } from 'vuelidate/lib/validators'

export default {
  mixins: [validationMixin],
  components: {
    Button,
    ErrorMessage,
    Form,
    IconAngleLeft,
    IconBase,
    InputField,
  },
  async beforeRouteEnter (to, from, next) {
    const isSignedIn = Boolean(await hoodie.account.get(`session`))

    next(isSignedIn ? `library` : true)
  },
  data () {
    return {
      username: ``,
      password: ``,
      isRequestPending: false,
      formErrorMessage: null,
    }
  },
  validations: {
    username: { required },
    password: { required },
  },
  methods: {
    hasError (fieldName) {
      const fieldValidation = this.$v[fieldName]

      return fieldValidation.$dirty && fieldValidation.$invalid
    },

    getErrorMessage (fieldName) {
      switch (fieldName) {
        case `username`:
          return `Please provide a username.`
        case `password`:
          return `Please provide a password.`
        default:
          return `Field is required.`
      }
    },

    async handleSubmit () {
      this.$v.$touch()

      if (!this.$v.$invalid) {
        const credentials = {
          username: this.username,
          password: this.password,
        }

        this.formErrorMessage = null
        this.isRequestPending = true
        this.signIn(credentials)
      }
    },

    async signIn (credentials) {
      try {
        await hoodie.account.signIn(credentials)

        router.push(`library`)
      } catch (error) {
        this.handleError(error)
      } finally {
        this.isRequestPending = false
      }
    },

    handleError (error) {
      this.formErrorMessage = error.message
    },
  },
}
</script>

<template>
  <div class="SignIn">
    <div class="content-container">
      <h1 class="headline">Welcome back!</h1>

      <ErrorMessage
        v-if="formErrorMessage"
        class="error-message"
      >
        {{ formErrorMessage }}
      </ErrorMessage>

      <Form
        class="form"
        @submit="handleSubmit"
      >
        <InputField
          label="Username"
          v-model="username"
          @blur="$v.username.$touch()"
          :attributes="{ autofocus: true }"
          :hasError="hasError(`username`)"
          :errorMessage="getErrorMessage(`username`)"
        />

        <InputField
          label="Password"
          type="password"
          @blur="$v.password.$touch()"
          v-model="password"
          :hasError="hasError(`password`)"
          :errorMessage="getErrorMessage(`password`)"
        />

        <Button
          class="button"
          theme="accent"
          type="submit"
          :isDisabled="isRequestPending"
          :isLoading="isRequestPending"
        >
          Sign in
        </Button>
      </Form>

      <router-link
        :to="{ name: 'signUp' }"
        class="sign-up-link"
      >
        <IconBase class="sign-up-link-icon">
          <IconAngleLeft />
        </IconBase>

        Create new account
      </router-link>
    </div>
  </div>
</template>

<style scoped>
  .SignIn {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100%;
  }

  .content-container {
    width: 360px;
    max-width: 100%;
    margin-top: var(--space);
  }

  .headline {
    font-size: 30px;
    color: var(--color-accent);
  }

  .error-message,
  .form,
  .button {
    margin-top: var(--space);
  }

  .sign-up-link {
    display: flex;
    margin-top: var(--space);
    text-decoration: none;
    color: var(--color-accent);
    font-size: var(--font-size-xl);
  }

  .sign-up-link-icon {
    height: 22px;
    margin-top: -1px;
  }
</style>