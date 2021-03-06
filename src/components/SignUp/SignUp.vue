<script>
  import router from '../../router'
  import Button from '@/components/Button'
  import ErrorMessage from '@/components/ErrorMessage'
  import Form from '@/components/formControls/Form'
  import hoodie from '@/lib/hoodie'
  import Icon from '@/components/Icon/Icon'
  import InputField from '@/components/formControls/InputField'
  import { signInAndDeriveEncryptionKey } from '../../lib/account'
  import { validationMixin } from 'vuelidate'
  import { required, minLength, sameAs } from 'vuelidate/lib/validators'

  export default {
    components: {
      Button,
      ErrorMessage,
      Form,
      Icon,
      InputField,
    },
    mixins: [validationMixin],
    async beforeRouteEnter (to, from, next) {
      const isSignedIn = Boolean(await hoodie.account.get(`session`))

      next(isSignedIn ? `library` : true)
    },
    data () {
      return {
        username: ``,
        password: ``,
        repeatedPassword: ``,
        isRequestPending: false,
        formErrorMessage: null,
      }
    },
    validations: {
      username: { required },
      password: {
        required,
        minLength: minLength(10),
      },
      repeatedPassword: {
        required,
        sameAsPassword: sameAs(`password`),
      },
    },
    methods: {
      hasError (fieldName) {
        const fieldValidation = this.$v[fieldName]

        return fieldValidation.$dirty && fieldValidation.$invalid
      },

      getErrorMessage (fieldName) {
        switch (fieldName) {
        case `username`:
          return `Please choose a username.`
        case `password`:
          return !this.$v.password.minLength
            ? `Please use at least 10 characters.`
            : `Please choose a password.`
        case `repeatedPassword`:
          return !this.$v.repeatedPassword.sameAsPassword
            ? `The passwords don't match.`
            : `Please repeat your password.`
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
          this.signUpAndSignIn(credentials)
        }
      },

      async signUpAndSignIn (credentials) {
        try {
          await hoodie.account.signUp(credentials)
          await signInAndDeriveEncryptionKey(credentials)

          router.push({ name: `library` })
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
  <div class="SignUp">
    <div class="content-container">
      <h1 class="headline">
        Create your account
      </h1>

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
          v-model="username"
          :attributes="{ autofocus: true }"
          :hasError="hasError(`username`)"
          :errorMessage="getErrorMessage(`username`)"
          label="Username"
          @blur="$v.username.$touch()"
        />

        <InputField
          v-model="password"
          :hasError="hasError(`password`)"
          :errorMessage="getErrorMessage(`password`)"
          label="Password"
          type="password"
          @blur="$v.password.$touch()"
        />

        <InputField
          v-model="repeatedPassword"
          :hasError="hasError(`repeatedPassword`)"
          :errorMessage="getErrorMessage(`repeatedPassword`)"
          label="Repeat password"
          type="password"
          @blur="$v.repeatedPassword.$touch()"
        />

        <Button
          :isDisabled="isRequestPending"
          :isLoading="isRequestPending"
          class="button"
          theme="accent-full"
          type="submit"
        >
          Sign up
        </Button>
      </Form>

      <router-link
        :to="{ name: 'signIn' }"
        class="sign-in-link"
      >
        <Icon
          name="angleLeftSolid"
          class="sign-in-link-icon"
        />

        Already signed up?
      </router-link>
    </div>
  </div>
</template>

<style scoped>
  .SignUp {
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

  .sign-in-link {
    display: flex;
    align-items: center;
    margin-top: var(--space);
    text-decoration: none;
    color: var(--color-accent);
    font-size: var(--font-size-xl);
  }

  .sign-in-link-icon {
    width: 22px;
    height: 22px;
  }
</style>
