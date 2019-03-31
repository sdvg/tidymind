<style scoped>
  .DocumentList {
    display: flex;
    flex-direction: column;
    height: 100%;
  }

  .title {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 4px 8px;
    color: var(--color-text-light);
    text-transform: uppercase;
    font-size: var(--font-size-l);
  }

  .listActions {
    display: flex;
    align-items: center;
  }

  .kebabMenuIcon {
    width: 16px;
    height: 16px;
    color: var(--color-text-light);
  }

  .kebabMenu {
    margin-left: 4px;
  }

  .list {
    height: 100%;
    overflow: auto;
  }
</style>

<template>
  <div class="DocumentList">
    <div class="title">
      <h2>Library</h2>

      <div class="listActions">
        <KebabMenu class="kebabMenu">
          <template slot="icon">
            <Icon
              class="kebabMenuIcon"
              name="plusSolid"
            />
          </template>
          <template slot="actions">
            <KebabMenuAction @click="createAndOpenDocumentInCurrentCategory">New document</KebabMenuAction>
            <KebabMenuAction @click="openCreateCategoryModal">New category</KebabMenuAction>
          </template>
        </KebabMenu>
      </div>
    </div>

    <ol class="list">
      <DocumentListCategory
        v-for="category of categoryTree"
        :key="category._id"
        :category="category"
        :depth="0"
      />
    </ol>
  </div>
</template>

<script>
  import { mapActions, mapGetters } from 'vuex'
  import DocumentListCategory from './DocumentListCategory'
  import KebabMenu from '../KebabMenu/KebabMenu'
  import KebabMenuAction from '../KebabMenu/KebabMenuAction'
  import Icon from '@/components/Icon/Icon'

  export default {
    components: {
      DocumentListCategory,
      KebabMenu,
      KebabMenuAction,
      Icon,
    },
    computed: mapGetters(`categories`, [`categoryTree`]),
    methods: {
      ...mapActions(`library`, [`openCreateCategoryModal`]),
      ...mapActions(`documents`, [`createAndOpenDocumentInCurrentCategory`]),
    },
  }
</script>
