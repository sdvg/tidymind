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
    padding: var(--space-xxxxxs) var(--space-xxxs);
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
        :value="document.title"
        class="title"
        placeholder="Document Title"
        @keyup="handleTitleChange"
      >

      <div
        :key="document._id"
        class="editors"
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
            title="Delete"
            @onClick="openRemoveDocumentModal(document._id)"
          />
        </div>
      </footer>
    </template>
  </div>
</template>

<script>
  import { mapActions, mapGetters } from 'vuex'
  import { debounce } from 'lodash'
  import Button from '@/components/Button'
  import RichTextEditor from '@/components/editors/RichTextEditor'

  export default {
    components: { Button, RichTextEditor },
    computed: {
      ...mapGetters(`documents`, [
        `getDocument`,
        `documentsLoaded`,
      ]),
      document () {
        return this.getDocument(this.$route.params.documentId)
      },
    },
    methods: {
      ...mapActions(`documents`, [`updateDocument`]),
      ...mapActions(`library`, [`openRemoveDocumentModal`]),
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
    },
  }
</script>
