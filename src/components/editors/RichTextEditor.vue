<style>
  .mce-tinymce {
    display: flex;
    flex-direction: column;
  }

  body .mce-container-body {
    height: 100%;
    display: flex;
    flex-direction: column;
  }

  .mce-toolbar .mce-container-body {
    flex-direction: row;
  }

  body .mce-edit-area {
    flex: 1;
  }

  iframe {
    flex: 1;
    height: 100% !important;
  }

  .mce-panel {
    box-shadow: none !important;
    border: none !important;
  }
</style>

<template>
  <textarea
    ref="textarea"
    :value="document.content"
  ></textarea>
</template>

<script>
import tinymce from 'tinymce'
import 'tinymce/themes/modern/theme'
import 'tinymce/skins/lightgray/skin.min.css'
import 'tinymce/skins/lightgray/content.min.css'

export default {
  props: {
    document: Object
  },
  mounted () {
    tinymce.init({
      target: this.$refs.textarea,
      branding: false,
      skin_url: `/tinymce/skin`,
      menubar: false,
      resize: false,
      statusbar: false,
      init_instance_callback: editor => {
        editor.on(`keyup`, () => {
          this.$emit(`contentChanged`, editor.getContent())
        })
      }
    })
  }
}
</script>
