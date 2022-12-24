import { createStore } from "vuex";
import { v4 as uuid } from "uuid";

import { saveStatePlugin } from "../utils";
import defaultBoard from "../default-board";

import type { StoreStateType, BoardType } from "./types";

const board: BoardType = JSON.parse(localStorage.getItem("board")!) || defaultBoard;

const store = {
  plugins: [saveStatePlugin],

  state: {
    board,
  },

  getters: {
    getTask(state: StoreStateType) {
      return (id: string) => {
        for (const column of state.board.columns) {
          for (const task of column.tasks) {
            if (task.id === id) return task;
          }
        }
      };
    },
  },

  mutations: {},
};

export default createStore(store);
