import { ActionContext } from "vuex";
import { RootState } from "..";
import { User } from "../../entity/Feedback";

export interface AuthState {
  currentUser: {};
}
const state = () => ({
  currentUser: {} as User,
});

// actions
const actions = {
  authenticationUser(
    { commit }: ActionContext<AuthState, RootState>,
    user: User
  ) {
    commit("setAuthenticatedUser", user);
  },
};

// mutations
const mutations = {
  setAuthenticatedUser(state: AuthState, user: User) {
    state.currentUser = user;
  },
};

export default {
  namespaced: true,
  state,
  actions,
  mutations,
};
