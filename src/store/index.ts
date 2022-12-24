import { createStore } from "vuex";
import { v4 as uuid } from "uuid";

import { saveStatePlugin } from "../utils";
import defaultBoard from "../default-board";

const board = JSON.parse(localStorage.getItem("board")!) || defaultBoard;

const store = {
  plugins: [saveStatePlugin],
  state: {
    board,
  },
  mutations: {},
};

export default createStore(store);
