import { createApp } from "vue";

import App from "./App.vue";
import { feedbackServices } from "./globals";
import FeedbackServicesWithAxios from "./infra/services/FeedbackServicesWithAxios";
import router from "./router";
import store from "./store";

const RootInstance = createApp(App);

declare module "@vue/runtime-core" {
  interface ComponentCustomProperties {
    $requestService: FeedbackServicesWithAxios;
  }
}
router.beforeEach(async (to, from, next) => {
  const res = await feedbackServices.showUser();
  if (res.error) {
    return;
  }
  store.dispatch("authUser/authenticationUser", res.values);
  next();
});

RootInstance.config.globalProperties.$requestService = feedbackServices;
RootInstance.use(router).use(store).mount("#app");
