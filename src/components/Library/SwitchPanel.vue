<style scoped>
  .SwitchPanel {
    width: 40vw;
    max-width: 600px;
    background: var(--color-text-light);
    border-radius: 3px;
  }

  .input-container {
    border-bottom: 1px solid var(--color-text);
  }

  .input {
    width: 100%;
    border: 2px solid transparent;
    outline: none;
    font-size: var(--font-size-xxxl);
    padding: var(--space-xs);
    border-top-left-radius: 3px;
    border-top-right-radius: 3px;
  }

  .input:focus {
    border-color: var(--color-accent);
  }

  .no-results {
    text-align: center;
    padding: var(--space-xs);
    font-size: var(--font-size-l);
  }

  .result-item {
    display: block;
    width: 100%;
    text-align: left;
    padding: var(--space-xxxs) var(--space-xs);
    text-decoration: none;
    color: var(--color-text-dark);
    font-size: var(--font-size-l);
  }

  .result-item:hover {
    background: var(--color-dark);
    color: #d6d6d6;
  }
</style>

<template>
  <Modal>
    <div class="SwitchPanel">
      <div class="input-container">
        <input
          v-model="searchQuery"
          class="input"
          placeholder="Switch to…"
          ref="input"
        >
      </div>

      <p
        class="no-results"
        v-if="!hasResults"
      >
        No results 😕
      </p>

      <ol
        class="results"
        v-if="hasResults"
      >
        <li
          v-for="result in results"
          :key="result._id"
          @click="$emit(`closePanel`)"
        >
          <router-link
            v-if="result._id.startsWith(`document`)"
            class="result-item"
            :to="{ name: 'library.document', params: { documentId: result._id } }"
            @click.native="expandCategoriesForDocumentId(result._id)"
          >
            {{ result.title }}
          </router-link>

          <button
            v-if="result._id.startsWith(`category`)"
            class="result-item"
            @click="openCategory(result)"
          >
            {{ result.title }}
          </button>
        </li>
      </ol>
    </div>
  </Modal>
</template>

<script>
import Modal from '../Modal'
import { mapState, mapActions } from 'vuex'

export default {
  components: {
    Modal,
  },
  mounted () {
    setTimeout(() => {
      if (this.$refs.input) { // prevent exceptions when HMR
        this.$refs.input.focus()
      }
    })
  },
  data () {
    return {
      searchQuery: ``,
    }
  },
  computed: {
    ...mapState(`categories`, [`categories`]),
    ...mapState(`documents`, [`documents`]),
    results () {
      return [
        ...this.categories,
        ...this.documents,
      ]
        .filter(entity => entity.title.trim() !== ``) // don't show entities without title
        .filter(entity => entity.title.toLowerCase().includes(this.searchQuery.toLowerCase()))
        .slice(0, 15) // limit to 15 visible results
    },
    hasResults () {
      return Boolean(this.results.length)
    },
  },
  methods: {
    ...mapActions(`categories`, {
      openCategory: `expandCategoriesRecursively`,
      expandCategoriesForDocumentId: `expandCategoriesForDocumentId`,
    }),
  },
}
</script>
