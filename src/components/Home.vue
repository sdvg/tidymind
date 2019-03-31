<template>
  <main>
    <ol>
      <li>
        <router-link :to="{ name: 'library' }">
          Library
        </router-link>
      </li>
      <li>
        <router-link :to="{ name: 'signUp' }">
          Sign up
        </router-link>
      </li>
      <li>
        <router-link :to="{ name: 'signIn' }">
          Sign In
        </router-link>
      </li>
    </ol>
  </main>
</template>
