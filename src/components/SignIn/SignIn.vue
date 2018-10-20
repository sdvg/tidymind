<script>
import Form from '@/components/formControls/Form'
import InputField from '@/components/formControls/InputField'
import Button from '@/components/Button'
import IconBase from '@/components/icons/IconBase'
import IconAngleLeft from '@/components/icons/IconAngleLeft'

export default {
  components: {
    Form,
    InputField,
    Button,
    IconBase,
    IconAngleLeft,
  },
}
</script>

<template>
  <div class="SignUp">
    <div class="div">
      <h1 class="headline">Welcome back!</h1>

      <Form class="form">
        <InputField
          label="Username"
        />

        <InputField
          label="Password"
          type="password"
        />

        <Button
          class="button"
          theme="accent"
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
  .SignUp {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
  }

  .headline {
    font-size: 30px;
    color: var(--color-accent);
  }

  .form {
    width: 360px;
    max-width: 100%;
    margin-top: var(--space);
  }

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
