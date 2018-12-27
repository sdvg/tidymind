<style scoped>
  .DocumentListDocument {
    display: flex;
    align-items: center;
  }

  .DocumentListDocument:hover,
  .DocumentListDocument.has-focus {
    background: #d6d6d6 !important;
  }

  .DocumentListDocument.is-unnamed {
    font-style: italic;
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
    padding: 4px calc(8px + var(--depth) * 16px);
    width: 100%;
  }

  .DocumentListDocument:hover .link,
  .DocumentListDocument.has-focus .link {
    color: #3f51b5 !important;
  }

  .label {
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
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
  }

  .DocumentListDocument:not(:hover) .menu {
    display: none;
  }
</style>

<template>
  <li
    class="DocumentListDocument"
    :class="{
      'has-focus': hasLinkFocus,
      'is-open': isDocumentOpen(document),
      'is-unnamed': isDocumentUnnamed(document)
    }"
    :style="{ '--depth': depth + 1 }"
  >
    <router-link
      class="link"
      :to="{ name: 'library.document', params: { documentId: document._id } }"
      @focus.native="onLinkFocus"
      @blur.native="onLinkBlur"
    >
      <IconBase class="icon">
        <IconFileText />
      </IconBase>

      <span class="label">
        <template v-if="document.title">{{ document.title }}</template>
        <template v-else>Unnamed document</template>
      </span>
    </router-link>

    <KebabMenu
      class="menu"
      theme="dark"
    >
      <template slot="actions">
        <KebabMenuAction>
          Delete
        </KebabMenuAction>

        <KebabMenuAction>
          Move
        </KebabMenuAction>
      </template>
    </KebabMenu>
  </li>
</template>

<script>
import KebabMenu from '@/components/KebabMenu/KebabMenu'
import KebabMenuAction from '@/components/KebabMenu/KebabMenuAction'
import IconBase from '@/components/icons/IconBase'
import IconFileText from '@/components/icons/IconFileText'

export default {
  components: {
    IconBase,
    IconFileText,
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
    }
  },
  methods: {
    isDocumentOpen (document) {
      return this.$route.params.documentId === document._id
    },
    isDocumentUnnamed (document) {
      return !document.title
    },
    onLinkFocus () {
      this.hasLinkFocus = true
    },
    onLinkBlur () {
      this.hasLinkFocus = false
    },
  },
}
</script>