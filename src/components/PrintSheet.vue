<template>
  <div
    class="PrintSheet"
    :class="`PrintSheet--${previewSize}`"
  >
    <div class="PrintSheet__corner">
      {{previewSizeLabel}}
    </div>
    <div class="PrintSheet__corner PrintSheet__corner--right" />

    <div class="PrintSheet__paper">
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
      previewSizeLabel: {
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

  $paper-sizes: (
    a4: 210mm 297mm,
    letter: 8.5in 11in,
  );
  $scaling-factors: (
    1 5,
    1 4,
    1 3,
    1 2,
    3 4,
    1 1,
  );

  // This whole thing makes me a bit uneasy...
  @each $name, $dimensions in $paper-sizes {
    $width: nth($dimensions, 1);
    $height: nth($dimensions, 2);

    .PrintSheet--#{$name} {
      width: $width;
      padding-top: percentage($height / $width);

      .PrintSheet__paper {
        width: $width;
        height: $height;
      }

      @each $scaling-factor-parts in $scaling-factors {
        $numerator: nth($scaling-factor-parts, 1);
        $denominator: nth($scaling-factor-parts, 2);
        $scaling-factor: $numerator / $denominator;

        // Optimally I'd like to match the 10mm padding with the .container padding. There are two problems with that:
        // 1. At least on Chrome 79, while media queries DO support calc(), mixing rems and mm in a single calc doesn't
        //    seem to work.
        // 2. The padding in .container changes with screen size. How would that even work with current approach...?
        @media (min-width: $width * $scaling-factor + 10mm) {
          width: $width * $scaling-factor;

          .PrintSheet__corner--right::after {
            content: "#{$numerator}:#{$denominator}";
          }

          .PrintSheet__paper {
            transform: scale($scaling-factor);
          }
        }
      }
    }
  }

  .PrintSheet {
    position: relative;
    max-width: 100vw;
    margin: 0 auto;
    background-color: $color-white;
    box-shadow: 0 r(8) r(24) $color-black;

    @media print {
      width: 100% !important;
      box-shadow: none;
    }
  }

  .PrintSheet__corner {
    position: absolute;
    top: 0;
    transform: translateY(-100%);
    padding-bottom: r(2);
    font-size: r(14);
    color: $color-white;
    opacity: 0.5;

    &--right {
      right: 0;
    }
  }

  .PrintSheet__paper {
    position: absolute;
    top: 0;
    left: 0;
    padding: 8mm;
    transform-origin: top left;

    @media print {
      transform: none !important;
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
