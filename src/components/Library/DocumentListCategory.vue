<style scoped>
  .container {
    display: flex;
    align-items: center;
  }

  .category,
  .empty-note {
    display: flex;
    align-items: center;
    padding: 4px 4px 4px calc(8px + var(--depth) * 16px);
    color: #d6d6d6;
    text-decoration: none;
    width: 100%;
    text-align: left;
    font-size: var(--font-size);
    outline: none;
    overflow: hidden;
    white-space: nowrap;
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
    transition: transform 200ms ease-in-out;
  }

  .is-expanded .category-icon {
    transform: rotate(90deg);
  }

  .label {
    overflow: hidden;
    text-overflow: ellipsis;
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
      :class="{ 'has-open-menu': isMenuOpen }"
      class="container"
    >
      <button
        :class="{ 'is-expanded': isExpanded }"
        :style="{ '--depth': depth }"
        :title="category.title"
        class="category"
        @click="toggleCategoryExpansion(category._id)"
      >
        <Icon
          name="chevronRightSolid"
          class="category-icon"
        />
        <span class="label">{{ category.title }}</span>
      </button>

      <KebabMenu
        class="menu"
        @open="menuOpened"
        @close="menuClosed"
      >
        <template slot="actions">
          <KebabMenuAction @click="openRemoveCategoryModal(category._id)">
            Delete
          </KebabMenuAction>

          <KebabMenuAction @click="openRenameCategoryModal(category._id)">
            Rename
          </KebabMenuAction>

          <KebabMenuAction @click="openMoveDocumentOrCategoryModal({ id: category._id, type: `category` })">
            Move
          </KebabMenuAction>

          <KebabMenuAction @click="createAndOpenDocument(category._id)">
            New document
          </KebabMenuAction>

          <KebabMenuAction @click="openCreateCategoryModal(category._id)">
            New category
          </KebabMenuAction>
        </template>
      </KebabMenu>
    </div>

    <ExpandTransition>
      <div v-if="isExpanded">
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
          :style="{ '--depth': depth + 1 }"
          class="empty-note"
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
  import Icon from '@/components/Icon/Icon'
  import ExpandTransition from '@/components/ExpandTransition'
  import KebabMenu from '@/components/KebabMenu/KebabMenu'
  import KebabMenuAction from '@/components/KebabMenu/KebabMenuAction'
  import DocumentListDocument from '@/components/Library/DocumentListDocument'

  export default {
    components: {
      DocumentListCategory: () => import(`./DocumentListCategory`),
      DocumentListDocument,
      ExpandTransition,
      Icon,
      KebabMenu,
      KebabMenuAction,
    },
    props: {
      category: {
        type: Object,
        required: true,
      },
      depth: {
        type: Number,
        required: true,
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
    methods: {
      ...mapActions(`categories`, [`toggleCategoryExpansion`]),
      ...mapActions(`documents`, [`createAndOpenDocument`]),
      ...mapActions(`library`, [
        `openCreateCategoryModal`,
        `openRenameCategoryModal`,
        `openMoveDocumentOrCategoryModal`,
        `openRemoveCategoryModal`,
      ]),
      menuOpened () {
        this.isMenuOpen = true
      },
      menuClosed () {
        this.isMenuOpen = false
      },
    },
  }
</script>
