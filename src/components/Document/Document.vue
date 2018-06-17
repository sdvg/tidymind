<style scoped>
  .Document {
    display: flex;
    flex-direction: column;
    flex-grow: 1;
  }

  .title {
    outline: none;
    border: none;
    border-bottom: 2px solid transparent;
    color: var(--color-text);
    transition: 150ms border-color;
    font-size: 32px;
    margin: 8px;
    padding: 0 8px;
  }

  .title:focus {
    border-color: var(--color-accent);
  }

  .content {
    width: 100%;
    flex-grow: 1;
    margin: 8px;
    padding: 8px;
    font-size: 14px;
    resize: none;
    border: none;
    outline: none;
    color: var(--color-text);
  }

  .footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: var(--color-gray);
    padding: 2px 8px;
  }
</style>

<template>
  <div class="Document">
    <template v-if="!document">
      <template v-if="documentsLoaded">
        Document not found
      </template>
      <template v-else>
        Loading&hellip;
      </template>
    </template>

    <template v-if="document">
      <input
        class="title"
        placeholder="Document Title"
        :value="document.title"
        @keyup="handleTitleChange"
      >

      <textarea
        class="content"
        :value="document.content"
        @keyup="handleContentChange"
      ></textarea>

      <footer class="footer">
        <div>
          <span>created: {{ document.createdAt | date }}</span>
          <span v-if="document.updatedAt">
            last change: {{ document.updatedAt | date }}
          </span>
        </div>

        <div>
          <Button
            title="delete"
            @onClick="removeDocument(document)"
          />
        </div>
      </footer>
    </template>
  </div>
</template>

<script>
import { createNamespacedHelpers } from 'vuex'
import { debounce } from 'lodash'
import Button from '@/components/Button'

const { mapActions, mapGetters } = createNamespacedHelpers(`documents`)

export default {
  components: { Button },
  methods: {
    ...mapActions([
      `updateDocument`,
      `removeDocument`
    ]),
    persistChange (field, newValue) {
      this.updateDocument({
        ...this.document,
        [field]: newValue
      })
    },
    handleTitleChange: debounce(function (event) {
      this.persistChange(`title`, event.target.value)
    }, 500),
    handleContentChange: debounce(function (event) {
      this.persistChange(`content`, event.target.value)
    }, 500)
  },
  computed: {
    ...mapGetters([
      `getDocument`,
      `documentsLoaded`
    ]),
    document () {
      return this.getDocument(this.$route.params.documentId)
    }
  }
}
</script>
