import requestContractWithAxios from "../../services/RequestToolWithAxios.js";
const state = () => ({
  feedbacks: [],
});

// getters
const getters = {
  getAllFeedbacksWithStatus: (state) => (key) =>
    state.feedbacks.filter((feedback) => feedback.status === key),
  showFeedbackWithId: (state) => (id) => {
    const response = state.feedbacks.filter((feedback) => feedback.id == id);
    return response;
  },
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
