<style scoped>
  .category,
  .document {
    display: block;
    padding: 4px calc(8px + var(--depth) * 16px);
    color: #d6d6d6;
    text-decoration: none;
    width: 100%;
    text-align: left;
    font-size: var(--font-size);
  }

  .category:hover,
  .document:hover {
    background: #d6d6d6;
    color: #3f51b5;
  }

  .document.is-unnamed {
    font-style: italic;
  }
</style>

<template>
  <li>
    <button
      class="category"
      :style="{ '--depth': depth }"
    >
      {{ category.title }} ▼
    </button>

    <ol>
      <li
        v-for="document in sortedDocuments"
        :key="document._id"
      >
        <router-link
          class="document"
          :class="{ 'is-unnamed': !document.title }"
          :style="{ '--depth': depth + 1 }"
          :to="{ name: 'library.document', params: { id: document._id } }"
        >
          <template v-if="document.title">{{ document.title }}</template>
          <template v-else>Unnamed document</template>
        </router-link>
      </li>
    </ol>

    <ol v-if="category.children">
      <Category
        v-for="childCategory of category.children"
        :key="childCategory._id"
        :category="childCategory"
        :depth="depth + 1"
      />
    </ol>
  </li>
</template>

<script>
import { mapGetters } from 'vuex'
import { sortBy } from 'lodash'

export default {
  components: { Category: () => import(`./Category`) },
  props: {
    category: Object,
    depth: Number
  },
  computed: {
    ...mapGetters(`documents`, [`getDocumentsForCategory`]),
    documents () {
      return this.getDocumentsForCategory(this.category._id)
    },
    sortedDocuments () {
      return sortBy(this.documents, document => document.title.toLowerCase())
    }
  }
}
</script>
