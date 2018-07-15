<template>
  <Button
    title="New"
    @onClick="handleCreateDocument"
  />
</template>

<script>
import { mapActions, mapMutations, mapGetters } from 'vuex'
import Button from '../Button'

export default {
  components: { Button },
  methods: {
    ...mapActions(`documents`, [`createDocument`]),
    ...mapMutations(`categories`, [`expandCategory`]),

    getCategoryId () {
      const currentDocument = this.getDocument(this.$route.params.documentId)

      if (this.$route.name === `library.document` && currentDocument) {
        return currentDocument.category
      } else {
        return this.firstCategory ? this.firstCategory._id : null
      }
    },

    async handleCreateDocument () {
      const categoryId = this.getCategoryId()
      const newDocument = await this.createDocument(categoryId)

      this.expandCategory(categoryId)

      this.$router.push({
        name: `library.document`,
        params: { documentId: newDocument._id },
      })
    },
  },
  computed: {
    ...mapGetters(`documents`, [`getDocument`]),
    ...mapGetters(`categories`, [`firstCategory`]),
  },
}
</script>
