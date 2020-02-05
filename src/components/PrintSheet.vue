<template>
  <div class="PrintSheet">
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
              <span class="PrintSheet__round-number">
                {{index + 1}}.
              </span>
          <span :class="{'PrintSheet__bye': opponent.type === 'bye'}">
                {{opponent.name}}
              </span>
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
  @import "../sass/utilities";

  .PrintSheet {
    display: flex;
    flex-direction: column;
    padding: r(24);
    max-width: r(960);
    margin: 0 auto;

    @media print {
      padding: 0;
    }
  }

  .PrintSheet__grid {
    display: flex;
    flex-wrap: wrap;
    margin: r(-16);

    &--compact {
      margin: r(-8);
    }
  }

  .PrintSheet__column-title {
    margin-bottom: r(8);
    font-weight: bold;
  }

  .PrintSheet__column {
    margin: r(20);

    .PrintSheet__grid--compact & {
      font-size: r(14);
      margin: r(12);
    }
  }

  .PrintSheet__round {
    & + & {
      margin-top: r(4);
    }
  }

  .PrintSheet__round-number {
    opacity: 0.5;
  }

  .PrintSheet__bye {
    display: inline-block;
    font-size: r(12);
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

  .PrintSheet__title {
    font-weight: 900;
    margin-bottom: r(16);
    font-size: r(32);
  }
</style>
