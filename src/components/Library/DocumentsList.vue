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
          <CreateDocumentButton>
            <KebabMenuAction>
                New document
            </KebabMenuAction>
          </CreateDocumentButton>

          <KebabMenuAction @click.native="openCreateCategoryModal">New category</KebabMenuAction>
        </KebabMenu>
      </div>
    </div>

    <ol class="list">
      <Category
        v-for="category of categoryTree"
        :key="category._id"
        :category="category"
        :depth="0"
      />
    </ol>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
import Category from './Category'
import CreateDocumentButton from './CreateDocumentButton'
import KebabMenu from '../KebabMenu/KebabMenu'
import KebabMenuAction from '../KebabMenu/KebabMenuAction'

export default {
  components: {
    Category,
    CreateDocumentButton,
    KebabMenu,
    KebabMenuAction,
  },
  computed: mapGetters(`categories`, [`categoryTree`]),
  methods: mapMutations(`library`, [`openCreateCategoryModal`]),
}
</script>
