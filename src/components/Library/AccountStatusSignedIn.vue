<style scoped>
  .AccountStatusSignedIn {
    display: flex;
    align-items: center;
  }

  .icon {
    width: 16px;
    height: 16px;
    margin-right: var(--space-xxxxs);
  }

  .signOut {
    margin-left: auto;
    color: var(--color-text-light);
  }
</style>

<template>
  <div class="AccountStatusSignedIn">
    <Icon
      name="userCircleRegular"
      class="icon"
    />
    Hello, {{ username }}

    <Button
      class="signOut"
      theme="plain"
      @onClick="signOut"
    >
      Sign Out
    </Button>
  </div>
</template>

<script>
  import Icon from '@/components/Icon/Icon'
  import Button from '../Button'
  import hoodie from '../../lib/hoodie'
  import router from '../../router'

  export default {
    components: {
      Button,
      Icon,
    },
    props: {
      username: {
        type: String,
        required: true,
      },
    },
    methods: {
      async signOut () {
        await hoodie.account.signOut()
        await router.push({ name: `library` })
        window.location.reload()
      },
    },
  }
</script>
