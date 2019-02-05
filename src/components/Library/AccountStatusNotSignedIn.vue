<style scoped>
  .AccountStatusNotSignedIn {
    display: flex;
    align-items: center;
  }

  .icon {
    width: 16px;
    height: 16px;
    margin-right: var(--space-xxxxs);
  }

  .links {
    display: flex;
    margin-left: auto;
  }

  .link-wrapper:not(:first-child)::before {
    content: "|";
    padding: 0 var(--space-xxxxxs);
  }

  .link {
    display: inline-flex;
    color: var(--color-text-light);
    text-decoration: none;
  }
</style>

<template>
  <div class="AccountStatusNotSignedIn">
    <IconBase class="icon">
      <IconExclamationCircle />
    </IconBase>

    Not signed in.

    <ul class="links">
      <li class="link-wrapper">
        <router-link
          :to="{ name: 'signIn' }"
          class="link"
        >
          Sign In
        </router-link>
      </li>
      <li class="link-wrapper">
        <router-link
          :to="{ name: 'signUp' }"
          class="link"
        >
          Sign Up
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script>
  import IconBase from '../icons/IconBase'
  import IconExclamationCircle from '../icons/IconExclamationCircle'

  export default {
    components: {
      IconBase,
      IconExclamationCircle,
    },
  }
</script>
