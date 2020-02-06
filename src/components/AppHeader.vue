<template>
  <div class="AppHeader">
    <div class="AppHeader__container container">
      <h1 class="AppHeader__title">
        Round<br>
        Robin<br>
        Schedule<br>
        Sheet<br>
        Builder
      </h1>
      <p class="AppHeader__description">
        Create a printable round robin bracket schedule. Schedule is created
        using the "polygon method" described
        <a
          href="https://nrich.maths.org/1443"
          class="AppHeader__link"
        >here</a>.
      </p>
    </div>
  </div>
</template>

<script>
  export default {}
</script>

<style lang="scss">
  @import "../sass/definitions";

  .AppHeader {
    padding: r(24) 0;
  }

  .AppHeader__title {
    font-weight: 900;
    color: $color-white;
    text-transform: uppercase;
    font-size: r(24);
  }

  .AppHeader__container {
    display: flex;
  }

  .AppHeader__description {
    font-size: r(14);
    color: $color-white;
    margin-left: r(32);
    line-height: 1.5;

    @include screen-up(M) {
      font-size: r(16);
      margin-left: r(48);
    }
  }

  .AppHeader__link {
    color: $color-white;
  }
</style>
