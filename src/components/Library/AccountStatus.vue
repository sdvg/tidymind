<style scoped>
  .AccountStatus {
    margin: var(--space-xxxs) var(--space-xxxs) 0;
    color: var(--color-text-light);
  }
</style>

<template>
  <div class="AccountStatus">
    <template v-if="account !== null">
      <AccountStatusNotSignedIn v-if="!account.session" />

      <AccountStatusSignedIn
        v-if="account.session"
        :username="account.username"
      />
    </template>
  </div>
</template>

<script>
import hoodie from '../../lib/hoodie'
import AccountStatusNotSignedIn from './AccountStatusNotSignedIn'
import AccountStatusSignedIn from './AccountStatusSignedIn'

export default {
  components: {
    AccountStatusNotSignedIn,
    AccountStatusSignedIn,
  },
  data () {
    return {
      account: null,
    }
  },
  async mounted () {
    this.account = await hoodie.account.get()
  },
}
</script>
