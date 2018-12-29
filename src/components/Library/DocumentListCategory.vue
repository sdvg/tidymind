<style scoped>
  .container {
    display: flex;
    align-items: center;
  }

  .category,
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

  .empty-note {
    font-style: italic;
    color: #b5b5b5;
  }

  .category-icon {
    flex-shrink: 0;
    width: 10px;
    height: 10px;
    margin-right: 6px;
  }

  .is-expanded .category-icon {
    transform: rotate(90deg);
  }

  .menu {
    margin-right: 16px;
    transition: 100ms opacity;
  }

  .container:not(:hover):not(.has-open-menu) .menu {
    opacity: 0;
  }
</style>

<template>
  <li>
    <div
      class="container"
      :class="{ 'has-open-menu': isMenuOpen }"
    >
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

      <KebabMenu
        class="menu"
        @open="menuOpened"
        @close="menuClosed"
      >
        <template slot="actions">
          <KebabMenuAction>
            Delete
          </KebabMenuAction>

          <KebabMenuAction>
            Move
          </KebabMenuAction>

          <KebabMenuAction>
            New document
          </KebabMenuAction>

          <KebabMenuAction>
            New category
          </KebabMenuAction>
        </template>
      </KebabMenu>
    </div>

    <ExpandTransition>
      <div
        v-if="isExpanded"
      >
        <ol>
          <DocumentListDocument
            v-for="document in sortedDocuments"
            :key="document._id"
            :document="document"
            :depth="depth + 1"
          />
        </ol>

        <ol v-if="category.children">
          <DocumentListCategory
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
import ExpandTransition from '@/components/ExpandTransition'
import KebabMenu from '@/components/KebabMenu/KebabMenu'
import KebabMenuAction from '@/components/KebabMenu/KebabMenuAction'
import DocumentListDocument from '@/components/Library/DocumentListDocument'

export default {
  components: {
    DocumentListCategory: () => import(`./DocumentListCategory`),
    DocumentListDocument,
    ExpandTransition,
    IconBase,
    IconChevronRight,
    KebabMenu,
    KebabMenuAction,
  },
  props: {
    category: Object,
    depth: Number,
  },
  methods: {
    ...mapActions(`categories`, [`toggleCategoryExpansion`]),
    menuOpened () {
      this.isMenuOpen = true
    },
    menuClosed () {
      this.isMenuOpen = false
    },
  },
  data () {
    return {
      isMenuOpen: false,
    }
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
