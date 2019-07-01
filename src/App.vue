<template>
  <div class="App">

    <div class="App__wrap print-hide">
      <h1 class="App__title">RR Schedule Sheet Builder</h1>
      <p class="App__description margin-below">
        Creates a printable round robin bracket schedule. Schedule is created
        using <a href="https://nrich.maths.org/1443">polygon method</a>.
      </p>

      <label class="App__input-group margin-below">
        <span class="App__label-text">Players ({{playerNames.length}})</span>
        <textarea
          v-model="value"
          class="App__text-input"
          :rows="1 + valueLineCount"
          placeholder="Enter player names on each line"
        />
      </label>

      <div class="App__input-group margin-below">
        <span class="App__label-text">Sizing</span>
        <label>
          <input type="radio" value="normal" v-model="size"> Normal
        </label>
        <label>
          <input type="radio" value="compact" v-model="size"> Compact
        </label>
      </div>

      <label class="App__input-group margin-below">
        <span class="App__label-text">Title (optional)</span>
        <input type="text" v-model.trim="title" class="App__text-input">
      </label>
    </div>

    <p
      class="App__wrap App__error"
      v-if="duplicatePlayersExist"
    >
      All player names must be unique!
    </p>
    <template v-else>
      <div class="App__wrap print-hide margin-below">
        <button @click="print">Print</button>
      </div>

      <hr class="print-hide">

      <div
        class="App__wrap App__wrap--full"
      >
        <h1 v-if="title" class="App__title">{{title}}</h1>

        <table
          class="App__table"
          :class="{'App__table--compact': size === 'compact'}"
        >
          <tbody>
            <tr>
              <th
                v-for="(playerName, index) in playerNames"
                :key="index"
              >{{playerName}}
              </th>
            </tr>
            <tr
              v-for="(round, index) in rounds"
              :key="index"
            >
              <td
                v-for="playerName in playerNames"
                :key="playerName"
              >
                <span class="App__round">
                  {{index + 1}}.
                </span>
                <span :class="{'App__bye': round[playerName].type === 'bye'}">
                  {{round[playerName].name}}
                </span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </template>


  </div>
</template>

<script>
  export default {
    name: 'App',
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
      players() {
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
        const players = [...this.players];

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
    },
    methods: {
      print() {
        window.print();
      }
    }
  }
</script>

<style lang="scss">
  @import "sass/utilities";

  .App {
    padding: r(32) 0;
  }

  .App__wrap {
    margin: 0 auto 0;
    max-width: r(640);
    padding: 0 r(24);

    &--full {
      max-width: none;
    }
  }

  .App__title {
    margin-bottom: r(16);
    font-size: r(32);
  }

  .App__label-text {
    display: block;
    margin-bottom: r(8);
  }

  .App__text-input {
    font-size: r(16);
    width: 100%;
    resize: none;
    padding: r(8);
  }

  .App__table {
    width: 100%;

    th {
      text-align: left;
      font-weight: bold;
      font-size: r(20);
      padding: r(4) r(4) r(8);
    }

    td {
      font-size: r(18);
      padding: r(4);
    }

    &--compact {
      th {
        text-align: left;
        font-weight: bold;
        font-size: r(16);
        padding: r(2) r(2) r(4);
      }

      td {
        font-size: r(14);
        padding: r(2);
      }
    }
  }

  .App__round {
    opacity: 0.5;
  }

  .App__bye {
    display: inline-block;
    font-size: r(12);
    text-align: center;
    font-family: sans-serif;
    border: solid r(1);
    padding: r(2) r(8);
    letter-spacing: r(1);
    text-transform: uppercase;
    border-radius: r(64);

    .App__table--compact & {
      font-size: r(10);
      padding: r(1) r(8);
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

  .margin-below {
    display: block;
    margin-bottom: r(24);
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
