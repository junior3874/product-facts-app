import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/",
    name: "home",
    component: () => import("@/views/home/Home.vue"),
    meta: { transition: "slide-right" },
  },
  {
    path: "/roadmap",
    name: "roadmap",
    component: () => import("@/views/roadmap/Roadmap.vue"),
    meta: { transition: "slide-right" },
  },
  {
    path: "/add-feedback",
    name: "add-feedback",
    component: () => import("@/views/addFeedback/AddFeedback.vue"),
    meta: { transition: "slide-right" },
  },
  {
    path: "/feedback/:id",
    name: "show-feedback",
    component: () => import("@/views/showFeedback/ShowFeedback.vue"),
    meta: { transition: "slide-right" },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
