import axios from "axios";

const state = () => ({
  currentUser: {},
});

// getters
const getters = {
  //   getFeedbacksWithStatus: (state) => state.feedbacks.filter(),
};

// actions
const actions = {
  authenticationUser({ commit }) {
    axios
      .get("/static-user.json")
      .then((res) => res.data)
      .then((res) => {
        commit("setAuthenticatedUser", res.currentUser);
      })
      .catch((err) => err);
  },
};

// mutations
const mutations = {
  setAuthenticatedUser(state, auth) {
    state.currentUser = auth;
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
