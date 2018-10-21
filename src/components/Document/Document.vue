<style scoped>
  .Document {
    display: flex;
    flex-direction: column;
    flex-grow: 1;
  }

  .noDocumentNotice {
    padding: var(--space-xxxs);
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

  .editors {
    display: flex;
    flex-grow: 1;
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
    <div
      v-if="!document"
      class="noDocumentNotice"
    >
      <template v-if="documentsLoaded">
        Document not found
      </template>
      <template v-else>
        Loading&hellip;
      </template>
    </div>

    <template v-if="document">
      <input
        class="title"
        placeholder="Document Title"
        :value="document.title"
        @keyup="handleTitleChange"
      >

      <div
        class="editors"
        :key="document._id"
      >
        <RichTextEditor
          :document="document"
          @contentChanged="handleContentChange"
        />
      </div>

      <footer class="footer">
        <div>
          <span>created: {{ document.hoodie.createdAt | date }}</span>
          <span v-if="document.hoodie.updatedAt">
            last change: {{ document.hoodie.updatedAt | date }}
          </span>
        </div>

        <div>
          <Button
            title="delete"
            @onClick="remove(document)"
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
import RichTextEditor from '@/components/editors/RichTextEditor'

const { mapActions, mapGetters } = createNamespacedHelpers(`documents`)

export default {
  components: { Button, RichTextEditor },
  methods: {
    ...mapActions([
      `updateDocument`,
      `removeDocument`,
    ]),
    persistChange (field, newValue) {
      this.updateDocument({
        ...this.document,
        [field]: newValue,
      })
    },
    handleTitleChange: debounce(function (event) {
      this.persistChange(`title`, event.target.value)
    }, 500),
    handleContentChange: debounce(function (content) {
      this.persistChange(`content`, content)
    }, 500),
    async remove () {
      await this.removeDocument(this.document)
      this.$router.push({ name: `library` })
    },
  },
  computed: {
    ...mapGetters([
      `getDocument`,
      `documentsLoaded`,
    ]),
    document () {
      return this.getDocument(this.$route.params.documentId)
    },
  },
}
</script>
