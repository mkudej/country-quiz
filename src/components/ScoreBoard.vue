<template>
  <div id="score-board">
    <figure>
      <img src="../assets/score.svg" alt="" />
    </figure>

    <h1>Results</h1>
    <p>
      You got <span>{{ gameScore }}</span> correct answers
    </p>

    <div class="controls">
      <button v-on:click="tryAgain()">Try again</button>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  name: "ScoreBoard",
  computed: mapGetters(["gameScore"]),
  methods: {
    ...mapActions(["startGame"]),
    tryAgain: function() {
      this.startGame();
    },
  },
};
</script>

<style scoped lang="scss">
#score-board {
  text-align: center;
  color: #1d355d;
  h1,
  p {
    margin: 0;
  }
  h1 {
    font-weight: bold;
    font-size: 48px;
    line-height: 72px;
    text-transform: none;
    color: #1d355d;
  }
  p {
    font-size: 18px;
    line-height: 27px;
    span {
      font-size: 34px;
      color: #60bf88;
      font-weight: bold;
    }
  }
  figure {
    margin: 0;
    margin-bottom: 72px;
    margin-top: 18px;
  }
  .controls {
    margin-top: 72px;
    button {
      cursor: pointer;
      transition: all 0.2s;
      width: 209px;
      height: 62px;
      border: 2px solid #1d355d;
      box-sizing: border-box;
      border-radius: 12px;
      font-weight: 600;
      font-size: 18px;
      color: #1d355d;
      &:hover {
        color: #fff;
        background: #1d355d;
      }
    }
  }
}
</style>
