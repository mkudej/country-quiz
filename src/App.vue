<template>
  <div id="app-wrapper">
    <div id="app">
      <h1>Country Quiz</h1>
      <div id="game-board">
        <template v-if="apiDataReady">
          <Quiz v-if="gameProgress" />
          <ScoreBoard v-else />
        </template>
        <Loading v-else />
      </div>
    </div>
  </div>
</template>

<script>
import Quiz from "./components/Quiz";
import ScoreBoard from "./components/ScoreBoard";
import Loading from "./components/Loading";
import { mapGetters, mapActions } from "vuex";

export default {
  name: "App",
  components: {
    Quiz,
    ScoreBoard,
    Loading,
  },
  data: () => ({
    apiDataReady: false,
  }),
  computed: mapGetters(["gameProgress", "allCountries"]),
  methods: mapActions(["fetchCountries"]),
  created() {
    this.fetchCountries().then(() => {
      if (this.allCountries) {
        this.apiDataReady = true;
      }
    });
  },
};
</script>

<style lang="scss">
@import url("//fonts.googleapis.com/css2?family=Poppins:wght@400;500;700&display=swap");

body {
  background: url(assets/background.png);
  background-size: cover;
  font-family: "Poppins", sans-serif;
  margin: 0;
}
*:active,
*:focus {
  outline: none;
}
#game-board {
  position: relative;
  background: #ffffff;
  border-radius: 24px;
  padding: 32px;
  min-height: 470px;
}
#app-wrapper {
  display: flex;
  min-height: 100vh;
  align-items: center;
  justify-content: center;
}
#app {
  width: 464px;
  margin: 50px auto;

  h1 {
    color: #f2f2f2;
    margin: 0;
    font-family: Poppins;
    font-style: normal;
    font-weight: bold;
    font-size: 36px;
    line-height: 54px;
    text-transform: uppercase;
    margin-bottom: 10px;
  }
}
</style>
