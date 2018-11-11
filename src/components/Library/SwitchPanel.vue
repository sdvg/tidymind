<style scoped>
  .SwitchPanel {
    width: 40vw;
    max-width: 600px;
    background: var(--color-text-light);
    border-radius: 3px;
    box-shadow: 0 0 5px 5px var(--color-text-dark);
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

  .result-item.is-active {
    background: var(--color-dark);
    color: #d6d6d6;
  }
</style>

<template>
  <Modal @closeModal="$emit(`closePanel`)">
    <div
      class="SwitchPanel"
      @mouseout="resetFocusedIndex"
    >
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
          v-for="(result, index) in results"
          :key="result._id"
          @click="$emit(`closePanel`)"
          @mouseover="focusedIndex = index"
        >
          <router-link
            v-if="result._id.startsWith(`document`)"
            class="result-item"
            :class="{ 'is-active': index === focusedIndex }"
            :to="{ name: 'library.document', params: { documentId: result._id } }"
            @click.native="expandCategoriesForDocumentId(result._id)"
          >
            {{ result.title }}
          </router-link>

          <button
            v-if="result._id.startsWith(`category`)"
            class="result-item"
            :class="{ 'is-active': index === focusedIndex }"
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
import shortcuts from '../../mixins/shortcuts'

export default {
  mixins: [shortcuts],
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
      focusedIndex: null,
    }
  },
  watch: {
    searchQuery () {
      this.resetFocusedIndex()
    },
  },
  computed: {
    ...mapState(`categories`, [`categories`]),
    ...mapState(`documents`, [`documents`]),
    results () {
      return [
        ...this.categories || [],
        ...this.documents || [],
      ]
        .filter(entity => entity.title.trim() !== ``) // don't show entities without title
        .filter(entity => entity.title.toLowerCase().includes(this.searchQuery.toLowerCase()))
        .sort(({ title: titleA }, { title: titleB }) => {
          if (titleA < titleB) return -1
          else if (titleB > titleA) return 1
          else return 0
        })
        .slice(0, 15) // limit to 15 visible results
    },
    resultsLength () {
      return this.results.length
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
    resetFocusedIndex () {
      this.focusedIndex = this.searchQuery.length ? 0 : null
    },
    openFocusedResult () {
      const focusedResult = this.results[this.focusedIndex]

      if (focusedResult._id.startsWith(`category`)) {
        this.openCategory(focusedResult)
      } else if (focusedResult._id.startsWith(`document`)) {
        this.$router.push({
          name: `library.document`,
          params: { documentId: focusedResult._id },
        })
      }

      this.$emit(`closePanel`)
    },
  },
  shortcuts: {
    down () {
      if (this.focusedIndex === null || this.focusedIndex === this.resultsLength - 1) {
        this.focusedIndex = 0
      } else {
        this.focusedIndex = this.focusedIndex + 1
      }
    },
    up () {
      if (this.focusedIndex === null || this.focusedIndex === 0) {
        this.focusedIndex = this.resultsLength - 1
      } else {
        this.focusedIndex = this.focusedIndex - 1
      }
    },
    enter () {
      this.openFocusedResult()
    },
    space () {
      this.openFocusedResult()
    },
  },
}
</script>
