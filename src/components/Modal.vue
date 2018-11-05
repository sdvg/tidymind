<template>
  <portal to="modals">
    <div class="Modal">
      <div class="modal-content">
        <slot />
      </div>
    </div>
  </portal>
</template>

<style>
  .Modal {
    display: flex;
    justify-content: center;
    align-items: center;
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background: rgba(0, 0, 0, .75);
    overflow: auto;
  }

  .modal-content {
    max-height: 100%;
  }
</style>
