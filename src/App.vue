<template>
  <AppLayout>

    <template #header>
      <AppHeader/>
    </template>

    <template #builderForm>
      <BuilderForm
        :player-names.sync="playerNames"
        :title.sync="title"
        :size.sync="size"
        :preview-size.sync="previewSize"
        :options-preview-size="optionsPreviewSize"
      />
    </template>

    <template #printSheet>
      <p
        v-if="duplicatePlayersExist"
        class="App__error"
      >
        All player names must be unique!
      </p>

      <template v-else>
        <button
          class="App__print"
          @click="print"
        >
          Print
        </button>
        <PrintSheet
          :player-names="playerNames"
          :title="title"
          :size="size"
          :preview-size="previewSize"
          :preview-size-label="previewSizeLabel"
        />
      </template>
    </template>

  </AppLayout>
</template>

<script>
  import AppLayout from './components/AppLayout';
  import AppHeader from './components/AppHeader';
  import PrintSheet from './components/PrintSheet';
  import BuilderForm from "./components/BuilderForm";

  export default {
    name: 'App',
    components: {
      AppLayout,
      AppHeader,
      BuilderForm,
      PrintSheet,
    },
    data() {
      return {
        playerNames: [],
        title: '',
        size: 'normal',
        previewSize: 'a4',
        optionsPreviewSize: [
          {
            label: 'A4',
            value: 'a4',
          },
          {
            label: 'Letter',
            value: 'letter',
          },
        ],
      };
    },
    computed: {
      duplicatePlayersExist() {
        return (new Set(this.playerNames)).size !== this.playerNames.length;
      },
      previewSizeLabel() {
        return this.optionsPreviewSize.find(option => option.value === this.previewSize).label;
      },
    },
    methods: {
      print() {
        window.print();
      }
    },
  };
</script>

<style lang="scss">
  @import "sass/definitions";

  .App__error {
    color: #ff5252;
    font-family: sans-serif;
    text-align: center;
  }

  .App__print {
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
    margin: 0 auto r(16);

    @media print {
      display: none;
    }
  }
</style>
