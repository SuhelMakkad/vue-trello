import { createRouter, createWebHistory } from "vue-router";
import Board from "../views/Board.vue";

const routes = [
  {
    path: "/",
    name: "Board",
    component: Board,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
