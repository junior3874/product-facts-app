import requestContractWithAxios from "../../services/RequestToolWithAxios.js";
const state = () => ({
  feedbacks: [],
});

// getters
const getters = {
  getFeedbacksWithStatus: (state) => (key) =>
    state.feedbacks.filter((name) => name.status === key),
};

// actions
const actions = {
  async getAllfeedbacks({ commit }) {
    const response = await requestContractWithAxios.onGetAllFeedbacks();
    commit("setFeedbacks", response.productRequests);
  },
};

// mutations
const mutations = {
  setFeedbacks(state, feedbacks) {
    state.feedbacks = feedbacks;
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
