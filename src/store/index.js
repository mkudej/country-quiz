import Vuex from "vuex";
import Vue from "vue";
import countries from "./modules/countries";
import game from "./modules/game";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    countries,
    game,
  },
});
