/* eslint-disable no-unused-vars */
import { createStore } from "vuex";

import feedbacks from "./modules/feedbacks";
import authUser from "./modules/auth";

export default createStore({
  modules: {
    feedbacks,
    authUser,
  },
});
