<style scoped>
  .category,
  .document {
    display: flex;
    align-items: center;
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

  .category-icon,
  .document-icon {
    width: 10px;
    height: 10px;
    margin-right: 6px;
  }
</style>

<template>
  <li>
    <button
      class="category"
      :style="{ '--depth': depth }"
    >
      <IconBase class="category-icon">
        <IconChevronDown />
      </IconBase>
      {{ category.title }}
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
          <IconBase class="document-icon">
            <IconFileText />
          </IconBase>

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
import IconBase from '@/components/icons/IconBase'
import IconChevronDown from '@/components/icons/IconChevronDown'
import IconFileText from '@/components/icons/IconFileText'

export default {
  components: {
    Category: () => import(`./Category`),
    IconBase,
    IconChevronDown,
    IconFileText
  },
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
