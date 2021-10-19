/* eslint-disable no-unused-vars */
import { createStore, Store } from "vuex";
import { InjectionKey } from "vue";

import authUser, { AuthState } from "./modules/auth";

export type RootState = {
  authUser: AuthState;
};

declare module "@vue/runtime-core" {
  // declare your own store states

  // provide typings for `this.$store`
  interface ComponentCustomProperties {
    $store: Store<RootState>;
  }
}

const store = createStore<RootState>({
  modules: {
    authUser,
  },
});
export default store;

export const key: InjectionKey<Store<RootState>> = Symbol();
