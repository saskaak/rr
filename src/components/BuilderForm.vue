<template>
  <div class="BuilderForm">
    <div class="BuilderForm__container container">
      <div class="BuilderForm__grid">

        <div class="BuilderForm__column">
          <label>
            <span class="BuilderForm__label-title">Players ({{playerNames.length}})</span>
            <textarea
              v-model="playersString"
              class="BuilderForm__input-text BuilderForm__input"
              :rows="Math.max(playersStringLineCount, 10)"
              placeholder="Enter player names on each line"
            />
          </label>
        </div>

        <div class="BuilderForm__column">
          <label class="BuilderForm__input-group">
            <span class="BuilderForm__label-title">Title</span>
            <input
              type="text"
              v-model.trim="localTitle"
              class="BuilderForm__input-text BuilderForm__input"
            >
          </label>

          <div class="BuilderForm__input-group">
            <div class="BuilderForm__label-title">Size</div>
            <InputRadio
              v-model="localSize"
              :options="[{value: 'normal', label: 'Normal'}, {value: 'compact', label: 'Compact'}]"
              class="BuilderForm__input"
            />
          </div>

          <div class="BuilderForm__input-group">
            <span class="BuilderForm__label-title">Preview size</span>
            <span class="BuilderForm__label-description">
              This sets the size of the preview view below. Doesn't affect the actual print output.
            </span>
            <InputRadio
              v-model="localPreviewSize"
              :options="optionsPreviewSize"
              class="BuilderForm__input"
            />
          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
  import vueBind from "../lib/vueBind";
  import InputRadio from "./InputRadio";

  export default {
    components: {InputRadio},
    props: {
      title: String,
      size: String,
      previewSize: String,
      optionsPreviewSize: Array,
    },
    data() {
      return {
        playersString: '',
      };
    },
    computed: {
      localTitle: vueBind.sync('title'),
      localSize: vueBind.sync('size'),
      localPreviewSize: vueBind.sync('previewSize'),
      playersStringLineCount() {
        return (this.playersString.match(/\n/g) || []).length + 1;
      },
      playerNames() {
        const trimmed = this.playersString.trim();
        const array = trimmed ? trimmed.split('\n') : [];

        return array.filter(player => player.trim() !== '');
      },
    },
    watch: {
      playerNames(newPlayerNames) {
        this.$emit('update:playerNames', newPlayerNames);
      }
    },
  };
</script>

<style lang="scss">
  @import "../sass/definitions";

  .BuilderForm {
  }

  .BuilderForm__container {
    display: flex;
    flex-direction: column;
  }

  .BuilderForm__grid {
    display: flex;
    margin: r(-16);
    flex-wrap: wrap;
  }

  .BuilderForm__column {
    width: 100%;
    padding: r(16);

    @include screen-up(M) {
      width: 50%;
    }
  }

  .BuilderForm__input-group {
    display: block;

    & + & {
      margin-top: r(24);
    }
  }

  .BuilderForm__label-title {
    display: block;
    color: $color-white;
    font-weight: bold;
  }

  .BuilderForm__label-description {
    display: block;
    color: $color-white;
    font-size: r(14);
    line-height: r(16);
    margin-top: r(2);
    opacity: 0.5;
  }

  .BuilderForm__input {
    margin-top: r(8);
  }

  .BuilderForm__input-text {
    display: block;
    width: 100%;
    padding: r(8) r(12);
    border: none;
    border-radius: r(4);
    font-size: r(16);
    background-color: #393939;
    box-shadow: 0 r(2) r(8) inset rgba($color-black-pure, 0.25);
    color: $color-white;
    transition: background-color 0.2s;
    resize: none;

    &:focus {
      outline: none;
    }

    &::placeholder {
      color: rgba($color-white, 0.5);
    }
  }
</style>
