<script>
  export default {
    props: {
      category: {
        type: Object,
        required: true,
      },
      numberOfChildCategories: {
        type: Number,
        required: true,
      },
      numberOfChildDocuments: {
        type: Number,
        required: true,
      },
    },
  }
</script>

<template>
  <p>
    Do you really want to delete category
    <em>{{ category.title }}</em><!--
    --><template v-if="numberOfChildCategories || numberOfChildDocuments">
      with
    </template><!--
    --><strong v-if="numberOfChildCategories">
      {{ numberOfChildCategories }}
      {{ numberOfChildCategories === 1 ? `category` : `categories` }}</strong><!--
    --><template v-if="numberOfChildCategories && numberOfChildDocuments">
      and
    </template><!--
    --><strong v-if="numberOfChildDocuments">
      {{ numberOfChildDocuments }}
      {{ numberOfChildDocuments === 1 ? `document` : `documents` }}</strong>?
  </p>
</template>
