<template>
  <div
    class="PrintSheet"
    :class="`PrintSheet--${previewSize}`"
  >
    <h1 v-if="title" class="PrintSheet__title">{{title}}</h1>

    <div
      class="PrintSheet__grid"
      :class="{'PrintSheet__grid--compact': size === 'compact'}"
    >
      <div
        v-for="card in cards"
        :key="card.name"
        class="PrintSheet__column"
      >
        <div class="PrintSheet__column-title">
          {{card.name}}
        </div>

        <div
          v-for="(opponent, index) in card.opponents"
          :key="opponent.name"
          class="PrintSheet__round"
        >
          <span class="PrintSheet__round-number">{{index + 1}}.</span>
          <span :class="{'PrintSheet__bye': opponent.type === 'bye'}">{{opponent.name}}</span>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      playerNames: {
        type: Array,
        required: true,
      },
      title: {
        type: String,
        required: true,
      },
      size: {
        type: String,
        required: true,
      },
      previewSize: {
        type: String,
        required: true,
      },
    },
    computed: {
      playersWithBye() {
        const players = this.playerNames.map(name => ({
          name,
          type: 'player',
        }));

        if (this.playerNames.length % 2 !== 0) {
          players.push({
            name: 'Bye',
            type: 'bye',
          });
        }

        return players;
      },
      rounds() {
        const players = [...this.playersWithBye];

        const roundsCount = players.length - 1;

        if (roundsCount < 1) {
          return []
        }

        const odd = players.pop();
        const pairCount = Math.floor(roundsCount / 2);
        return [...Array(roundsCount).keys()].map((round) => {

          // rotate
          if (round > 0) {
            players.unshift(players.pop());
          }

          const pairs = [
            ...[...Array(pairCount).keys()]
              .map((index) => [players[index], players[players.length - index - 1]]),
            [odd, players[pairCount]],
          ];

          const opponents = {};
          pairs.forEach(pair => {
            opponents[pair[0].name] = pair[1];
            opponents[pair[1].name] = pair[0];
          });

          return opponents;
        });
      },
      cards() {
        return this.playerNames.map((playerName) => ({
          name: playerName,
          opponents: this.rounds.map(round => round[playerName]),
        }));
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
  @import "../sass/definitions";

  .PrintSheet {
    display: flex;
    flex-direction: column;
    padding: 10mm;
    margin: 0 auto;
    background-color: $color-white;
    box-shadow: 0 r(8) r(24) $color-black;

    &--a4 {
      width: 210mm;
      height: 297mm;
    }

    &--letter {
      width: 8.5in;
      height: 11in;
    }

    @media print {
      width: 100%;
      height: 100%;
      box-shadow: none;
    }
  }

  .PrintSheet__title {
    margin-bottom: r(16);
    font-weight: 700;
    font-size: r(28);
  }

  .PrintSheet__grid {
    display: flex;
    flex-wrap: wrap;
    margin: -4mm;

    &--compact {
      margin: -2mm;
    }
  }

  .PrintSheet__column {
    font-size: 4.5mm;
    margin: 4mm;

    .PrintSheet__grid--compact & {
      margin: 2mm;
      font-size: 4mm;
    }
  }

  .PrintSheet__column-title {
    margin-bottom: 2mm;
    font-weight: bold;
  }

  .PrintSheet__round {
    display: flex;

    & + & {
      margin-top: 1mm;
    }
  }

  .PrintSheet__round-number {
    opacity: 0.5;
    margin-right: 1mm;
  }

  .PrintSheet__bye {
    display: inline-block;
    font-size: 3mm;
    text-align: center;
    font-family: sans-serif;
    border: solid r(1);
    padding: r(2) r(6);
    letter-spacing: r(1);
    text-transform: uppercase;
    border-radius: r(64);

    .PrintSheet__grid--compact & {
      font-size: r(10);
      padding: r(1) r(6);
    }
  }
</style>
