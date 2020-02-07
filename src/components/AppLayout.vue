<template>
  <div class="AppLayout">

    <div class="AppLayout__header">
      <slot name="header"/>
    </div>

    <div class="AppLayout__content">
      <div class="AppLayout__builder-form">
        <slot name="builderForm"/>
      </div>

      <div class="AppLayout__print-sheet">
        <slot name="printSheet"/>
      </div>
    </div>
  </div>
</template>

<script>
  export default {};
</script>

<style lang="scss">
  @import "../sass/definitions";

  .AppLayout {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
  }

  .AppLayout__header {
    @media print {
      display: none;
    }
  }

  .AppLayout__content {
    flex: 1;
    background-color: $color-gray-dark;
    padding-top: r(32);

    @media print {
      padding-top: 0;
      background-color: $color-white;
      display: block;
    }
  }

  .AppLayout__builder-form {
    margin-bottom: r(48);

    @media print {
      display: none;
    }
  }

  .AppLayout__print-sheet {
    margin-bottom: r(64);

    @media print {
      margin-bottom: 0;
    }
  }
</style>
