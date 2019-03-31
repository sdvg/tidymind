<script>
  import angleLeftSolid from './icons/angle-left-solid.icon.svg'
  import chevronRightSolid from './icons/chevron-right-solid.icon.svg'
  import ellipsisVSolid from './icons/ellipsis-v-solid.icon.svg'
  import exclamationCircleSolid from './icons/exclamation-circle-solid.icon.svg'
  import fileAltRegular from './icons/file-alt-regular.icon.svg'
  import folderSolid from './icons/folder-solid.icon.svg'
  import plusSolid from './icons/plus-solid.icon.svg'
  import spinnerSolid from './icons/spinner-solid.icon.svg'
  import userCircleRegular from './icons/user-circle-regular.icon.svg'

  const iconMap = {
    angleLeftSolid: angleLeftSolid.id,
    chevronRightSolid: chevronRightSolid.id,
    ellipsisVSolid: ellipsisVSolid.id,
    exclamationCircleSolid: exclamationCircleSolid.id,
    fileAltRegular: fileAltRegular.id,
    folderSolid: folderSolid.id,
    plusSolid: plusSolid.id,
    spinnerSolid: spinnerSolid.id,
    userCircleRegular: userCircleRegular.id,
  }

  export default {
    props: {
      name: {
        type: String,
        required: true,
        validate: name => Object.keys(iconMap).includes(name),
      },
    },
    computed: {
      iconId () {
        return iconMap[this.name]
      },
    },
  }
</script>

<template>
  <svg class="icon">
    <use :xlink:href="`#${iconId}`" />
  </svg>
</template>

<style scoped>
  .icon {
    fill: currentColor;
  }
</style>
