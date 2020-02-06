<template>
  <span
    class="InputRadio">
    <label
      v-for="option in options"
      :key="option.value"
      class="InputRadio__label"
      :class="{'InputRadio__label--checked': option.value === value}"
    >
      <input
        type="radio"
        v-model="localValue"
        :value="option.value"
        class="InputRadio__input"
      />
      <span class="InputRadio__indicator" />
      {{option.label}}
    </label>
  </span>
</template>

<script>
  import vueBind from "../lib/vueBind";

  export default {
    props: {
      options: Array,
      value: String,
    },
    computed: {
      localValue: vueBind.vModel,
    },
  };
</script>

<style lang="scss">
  @import "../sass/definitions";

  .InputRadio {
    display: flex;
  }

  .InputRadio__label {
    display: flex;
    align-items: center;
    color: $color-white;

    & + & {
      margin-left: r(16);
    }
  }

  .InputRadio__input {
    display: none;
  }

  .InputRadio__indicator {
    display: flex;
    justify-content: center;
    align-items: center;
    width: r(16);
    height: r(16);
    margin-right: r(4);
    border-radius: r(8);
    background-color: #393939;
    box-shadow: 0 r(2) r(8) inset rgba($color-black-pure, 0.25);

    .InputRadio__label--checked &::after {
      content: "";
      background-color: $color-white;
      width: r(8);
      height: r(8);
      border-radius: r(4);
    }
  }
</style>
