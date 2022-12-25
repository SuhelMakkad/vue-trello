import { createStore } from "vuex";
import { v4 as uuid } from "uuid";

import { saveStatePlugin } from "../utils";
import defaultBoard from "../default-board";

import type { StoreStateType, BoardType, Task } from "./types";

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

  mutations: {
    CREATE_TASK(state: StoreStateType, { task, columnName }: { task: Task; columnName: string }) {
      const column = state.board.columns.find((column) => column.name === columnName);
      if (!column) return;

      column.tasks.push(task);
    },

    UPDATE_TASK(
      state: StoreStateType,
      { task, key, value }: { task: Task; key: keyof Task; value: string }
    ) {
      task[key] = value;
    },
  },
};

export type StoreType = typeof store;

export default createStore(store);
