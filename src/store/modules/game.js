const state = {
  inProgress: true,
  score: 0,
};

const getters = {
  gameProgress: (state) => state.inProgress,
  gameScore: (state) => state.score,
};

const actions = {
  increaseScore({ commit }) {
    commit("increaseScore");
  },
  startGame({ commit }) {
    commit("startGame");
  },
  endGame({ commit }) {
    commit("endGame");
  },
};

const mutations = {
  increaseScore: (state) => (state.score = state.score + 1),
  startGame: (state) => {
    state.score = 0;
    state.inProgress = true;
  },
  endGame: (state) => (state.inProgress = false),
};

export default {
  state,
  getters,
  actions,
  mutations,
};
