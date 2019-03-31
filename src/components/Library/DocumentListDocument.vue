<style scoped>
  .DocumentListDocument {
    display: flex;
    align-items: center;
  }

  .DocumentListDocument:hover,
  .DocumentListDocument.has-focus,
  .DocumentListDocument.has-open-menu {
    background: #d6d6d6 !important;
  }

  .DocumentListDocument.is-open {
    background: var(--color-dark);
    color: #d6d6d6;
  }

  .link {
    color: #d6d6d6;
    text-decoration: none;
    font-size: var(--font-size);
    outline: none;
    padding: 4px 4px 4px calc(8px + var(--depth) * 16px);
    width: 100%;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  .DocumentListDocument:hover .link,
  .DocumentListDocument.has-focus .link,
  .DocumentListDocument.has-open-menu .link {
    color: #3f51b5 !important;
  }

  .icon {
    flex-shrink: 0;
    width: 10px;
    height: 10px;
    margin-right: 6px;
  }

  .menu {
    display: flex;
    margin-right: 16px;
    transition: 100ms opacity;
  }

  .DocumentListDocument:not(:hover):not(.has-open-menu) .menu {
    opacity: 0;
  }
</style>

<template>
  <li
    :class="{
      'has-focus': hasLinkFocus,
      'is-open': isDocumentOpen(document),
      'has-open-menu': isMenuOpen,
    }"
    :style="{ '--depth': depth + 1 }"
    class="DocumentListDocument"
  >
    <router-link
      :to="{ name: 'library.document', params: { documentId: document._id } }"
      :title="document.title"
      class="link"
      @focus.native="onLinkFocus"
      @blur.native="onLinkBlur"
    >
      <Icon
        name="fileAltRegular"
        class="icon"
      />

      <DocumentTitle :title="document.title" />
    </router-link>

    <KebabMenu
      class="menu"
      theme="dark"
      @open="menuOpened"
      @close="menuClosed"
    >
      <template slot="actions">
        <KebabMenuAction @click="openRemoveDocumentModal(document._id)">
          Delete
        </KebabMenuAction>

        <KebabMenuAction @click="openMoveDocumentOrCategoryModal({ id: document._id, type: `document` })">
          Move
        </KebabMenuAction>
      </template>
    </KebabMenu>
  </li>
</template>

<script>
  import { mapActions } from 'vuex'
  import DocumentTitle from './DocumentTitle'
  import Icon from '@/components/Icon/Icon'
  import KebabMenu from '@/components/KebabMenu/KebabMenu'
  import KebabMenuAction from '@/components/KebabMenu/KebabMenuAction'

  export default {
    components: {
      DocumentTitle,
      Icon,
      KebabMenu,
      KebabMenuAction,
    },
    props: {
      document: {
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
        hasLinkFocus: false,
        isMenuOpen: false,
      }
    },
    methods: {
      ...mapActions(`library`, [`openRemoveDocumentModal`, `openMoveDocumentOrCategoryModal`]),
      isDocumentOpen (document) {
        return this.$route.params.documentId === document._id
      },
      onLinkFocus () {
        this.hasLinkFocus = true
      },
      onLinkBlur () {
        this.hasLinkFocus = false
      },
      menuOpened () {
        this.isMenuOpen = true
      },
      menuClosed () {
        this.isMenuOpen = false
      },
    },
  }
</script>
