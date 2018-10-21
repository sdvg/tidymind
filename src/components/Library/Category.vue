<style scoped>
  .category,
  .document,
  .empty-note {
    display: flex;
    align-items: center;
    padding: 4px calc(8px + var(--depth) * 16px);
    color: #d6d6d6;
    text-decoration: none;
    width: 100%;
    text-align: left;
    font-size: var(--font-size);
    outline: none;
  }

  .category {
    font-weight: 500;
  }

  .category:hover,
  .category:focus {
    color: var(--color-dark);
  }

  .document:hover,
  .document:focus {
    background: #d6d6d6 !important;
    color: #3f51b5 !important;
  }

  .document.is-unnamed {
    font-style: italic;
  }

  .document.is-open {
    background: var(--color-dark);
    color: #d6d6d6;
  }

  .empty-note {
    font-style: italic;
    color: #b5b5b5;
  }

  .label {
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
  }

  .category-icon,
  .document-icon {
    flex-shrink: 0;
    width: 10px;
    height: 10px;
    margin-right: 6px;
  }

  .is-expanded .category-icon {
    transform: rotate(90deg);
  }
</style>

<template>
  <li>
    <button
      class="category"
      :class="{ 'is-expanded': isExpanded }"
      :style="{ '--depth': depth }"
      @click="toggleCategoryExpansion(category._id)"
    >
      <IconBase class="category-icon">
        <IconChevronRight />
      </IconBase>
      <span class="label">{{ category.title }}</span>
    </button>

    <ExpandTransition>
      <div
        v-if="isExpanded"
      >
        <ol>
          <li
            v-for="document in sortedDocuments"
            :key="document._id"
          >
            <router-link
              class="document"
              :class="{
                'is-open': isDocumentOpen(document),
                'is-unnamed': isDocumentUnnamed(document)
              }"
              :style="{ '--depth': depth + 1 }"
              :to="{ name: 'library.document', params: { documentId: document._id } }"
            >
              <IconBase class="document-icon">
                <IconFileText />
              </IconBase>

              <span class="label">
                <template v-if="document.title">{{ document.title }}</template>
                <template v-else>Unnamed document</template>
              </span>
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

        <div
          v-if="isEmpty"
          class="empty-note"
          :style="{ '--depth': depth + 1 }"
        >
          empty
        </div>
      </div>
    </ExpandTransition>
  </li>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import { sortBy } from 'lodash'
import IconBase from '@/components/icons/IconBase'
import IconChevronRight from '@/components/icons/IconChevronRight'
import IconFileText from '@/components/icons/IconFileText'
import ExpandTransition from '@/components/ExpandTransition'

export default {
  components: {
    Category: () => import(`./Category`),
    IconBase,
    IconChevronRight,
    IconFileText,
    ExpandTransition,
  },
  props: {
    category: Object,
    depth: Number,
  },
  methods: {
    ...mapActions(`categories`, [`toggleCategoryExpansion`]),
    isDocumentOpen (document) {
      return this.$route.params.documentId === document._id
    },
    isDocumentUnnamed (document) {
      return !document.title
    },
  },
  computed: {
    ...mapGetters(`documents`, [`getDocumentsForCategory`]),
    ...mapGetters(`categories`, [`isCategoryExpanded`]),
    documents () {
      return this.getDocumentsForCategory(this.category._id)
    },
    sortedDocuments () {
      return sortBy(this.documents, document => document.title.toLowerCase())
    },
    isEmpty () {
      return !this.category.children && this.documents.length === 0
    },
    isExpanded () {
      return this.isCategoryExpanded(this.category._id)
    },
  },
}
</script>
