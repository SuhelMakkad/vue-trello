import { createStore } from "vuex";
import { v4 as uuid } from "uuid";

import { saveStatePlugin } from "../utils";
import defaultBoard from "../default-board";

import type { BoardType } from "./types";

const board: BoardType = JSON.parse(localStorage.getItem("board")!) || defaultBoard;

const store = {
  plugins: [saveStatePlugin],

  state: {
    board,
  },

  mutations: {},
};

export default createStore(store);
