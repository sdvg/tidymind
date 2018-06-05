<style scoped>
  ul {
    list-style: none;
    margin-top: 8px;
  }

  a {
    display: block;
    padding: 4px 8px;
    color: #d6d6d6;
    text-decoration: none;
  }

  a:hover {
    background: #d6d6d6;
    color: #3f51b5;
  }
</style>

<template>
  <ul>
    <li
      v-for="document in orderedDocuments"
      :key="document._id"
    >
      <router-link :to="{ name: 'library.document', params: { id: document._id } }">
        <template v-if="document.title">{{ document.title }}</template>
        <i v-else>Unnamed document</i>
      </router-link>
    </li>
  </ul>
</template>

<script>
import { sortBy } from 'lodash'

export default {
  props: [`documents`],
  computed: {
    orderedDocuments () {
      return sortBy(this.documents, `title`)
    }
  }
}
</script>
