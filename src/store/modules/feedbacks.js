/* eslint-disable no-unused-vars */

import makeIndexFeedbackController from "../../factories/makeIndexFeedbackController.js";
import makePostFeedbackCommentController from "../../factories/makePostFeedbackCommentController.js";

// states
const state = () => ({
  feedbacks: [],
});

// getters
const getters = {
  getAllFeedbacksWithStatus: (state) => (key) =>
    state.feedbacks.filter((feedback) => feedback.status === key),
  showFeedbackWithId: (state) => (id) => {
    const response = state.feedbacks.find((feedback) => feedback.id == id);
    return response;
  },
};

// actions
const actions = {
  async getAllfeedbacks({ commit }) {
    const indexFeedbackController = makeIndexFeedbackController();
    const response = await indexFeedbackController.handler();

    commit("setFeedbacks", response.feedbacks);
  },
  async postFeedbackCommentController({ commit, rootState }, payload) {
    const { currentUser } = rootState.authUser;
    if (!currentUser) {
      return;
    }

    const postFeedbackCommentController = makePostFeedbackCommentController();

    const response = await postFeedbackCommentController.handler({
      ...payload,
      userProps: currentUser,
    });
    if (response.error) {
      return response;
    }

    commit("createComment", response.feedback);
    return response;
  },
};

// mutations
const mutations = {
  setFeedbacks(state, feedbacks) {
    state.feedbacks = feedbacks;
  },
  createComment(state, feedback) {
    const alteredFeedback = state.feedbacks.map((element) => {
      if (element.id == feedback.id) {
        element = feedback;
      }
      return element;
    });
    state.feedbacks = alteredFeedback;
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
