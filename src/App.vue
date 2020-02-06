<template>
  <div class="App">

    <AppHeader class="print-hide"/>

    <div class="App__controls">
      <div class="container">
        <label class="App__input-group">
          <span class="App__label-text">Players ({{playerNames.length}})</span>
          <textarea
            v-model="value"
            class="App__text-input"
            :rows="1 + valueLineCount"
            placeholder="Enter player names on each line"
          />
        </label>

        <div class="App__input-group">
          <span class="App__label-text">Sizing</span>
          <label class="App__checkbox-label">
            <input
              type="radio"
              value="normal"
              v-model="size"
            > Normal
          </label>
          <label class="App__checkbox-label">
            <input
              type="radio"
              value="compact"
              v-model="size"
            > Compact
          </label>
        </div>

        <label class="App__input-group">
          <span class="App__label-text">Title (optional)</span>
          <input type="text" v-model.trim="title" class="App__text-input">
        </label>
      </div>

      <div class="App__wrap print-hide">
        <button @click="print">Print</button>
      </div>
    </div>

    <p
      class="App__wrap App__error"
      v-if="duplicatePlayersExist"
    >
      All player names must be unique!
    </p>
    <template v-else>
      <PrintSheet
        :player-names="playerNames"
        :size="size"
        :title="title"
      />
    </template>

  </div>
</template>

<script>
  import AppHeader from './components/AppHeader';
  import PrintSheet from './components/PrintSheet';

  export default {
    name: 'App',
    components: {
      PrintSheet,
      AppHeader,
    },
    data() {
      return {
        value: '',
        size: 'normal',
        title: '',
      };
    },
    computed: {
      valueLineCount() {
        return (this.value.match(/\n/g) || []).length + 1;
      },
      playerNames() {
        const trimmed = this.value.trim();
        const array = trimmed ? trimmed.split('\n') : [];

        return array.filter(player => player.trim() !== '');
      },
      duplicatePlayersExist() {
        return (new Set(this.playerNames)).size !== this.playerNames.length;
      },
    },
    methods: {
      print() {
        window.print();
      }
    }
  }
</script>

<style lang="scss">
  @import "sass/definitions";

  .App {
  }

  .App__controls {
    background-color: $color-gray-dark;
    padding: r(32) 0;
  }

  .App__input-group {
    display: block;
    margin-bottom: r(24);
  }

  .App__label-text {
    color: $color-white;
    display: block;
    margin-bottom: r(8);
  }

  .App__checkbox-label {
    color: $color-white;
  }

  .App__text-input {
    font-size: r(16);
    width: 100%;
    resize: none;
    padding: r(8) r(12);
    background-color: #393939;
    border: none;
    box-shadow: 0 r(2) r(8) inset rgba($color-black-pure, 0.25);
    border-radius: r(4);
    color: $color-white;
    transition: background-color 0.2s;

    &:focus {
      outline: none;
    }

    &::placeholder {
      color: rgba($color-white, 0.5);
    }
  }

  .App__error {
    color: #ff5252;
    font-family: sans-serif;
    text-align: center;
  }

  // quick and dirty helpers

  .print-hide {
    @media print {
      display: none !important;
    }
  }

  button {
    background-color: #73e698;
    display: block;
    padding: r(8) r(16);
    border: none;
    font-weight: bold;
    font-size: r(14);
    letter-spacing: r(1);
    text-transform: uppercase;
    cursor: pointer;
    border-radius: r(8);
    margin: 0 auto;
  }
</style>
