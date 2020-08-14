import axios from "axios";

const state = {
  countries: [],
};

const getters = {
  allCountries: (state) => state.countries,
};

const actions = {
  async fetchCountries({ commit }) {
    const response = await axios.get("//restcountries.eu/rest/v2/all");
    const maped = response.data.map((country) => {
      return {
        name: country.name,
        flag: country.flag,
        capital: country.capital,
        alpha2Code: country.alpha2Code,
        asked: false,
      };
    });
    commit("setCountries", maped);
  },
};

const mutations = {
  setCountries: (state, countries) => (state.countries = countries),
};

export default {
  state,
  getters,
  actions,
  mutations,
};
