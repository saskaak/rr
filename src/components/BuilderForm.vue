<template>
  <div class="BuilderForm">
    <div class="BuilderForm__container container">
      <div class="BuilderForm__grid">

        <div class="BuilderForm__column">
          <label>
            <span class="BuilderForm__label-text">Players ({{playerNames.length}})</span>
            <textarea
              v-model="playersString"
              class="BuilderForm__text-input"
              :rows="Math.max(playersStringLineCount, 10)"
              placeholder="Enter player names on each line"
            />
          </label>
        </div>

        <div class="BuilderForm__column">
          <label class="BuilderForm__input-group">
            <span class="BuilderForm__label-text">Title (optional)</span>
            <input type="text" v-model.trim="localTitle" class="BuilderForm__text-input">
          </label>

          <div class="BuilderForm__input-group">
            <span class="BuilderForm__label-text">Size</span>
            <label class="BuilderForm__checkbox-label">
              <input
                type="radio"
                value="normal"
                v-model="localSize"
              > Normal
            </label>
            <label class="BuilderForm__checkbox-label">
              <input
                type="radio"
                value="compact"
                v-model="localSize"
              > Compact
            </label>
          </div>

          <div class="BuilderForm__input-group">
            <span class="BuilderForm__label-text">Preview size</span>
            <label class="BuilderForm__checkbox-label">
              <input
                type="radio"
                value="a4"
                v-model="localPreviewSize"
              > A4
            </label>
            <label class="BuilderForm__checkbox-label">
              <input
                type="radio"
                value="letter"
                v-model="localPreviewSize"
              > Letter
            </label>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
  import vueBind from "../lib/vueBind";

  export default {
    props: {
      title: String,
      size: String,
      previewSize: String,
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
    margin-bottom: r(24);
  }

  .BuilderForm__label-text {
    display: block;
    color: $color-white;
    margin-bottom: r(8);
    font-weight: bold;
  }

  .BuilderForm__checkbox-label {
    color: $color-white;
  }

  .BuilderForm__text-input {
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
