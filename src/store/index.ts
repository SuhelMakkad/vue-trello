import { createStore } from "vuex";

import { saveStatePlugin } from "../utils";
import defaultBoard from "../default-board";

import type { StoreStateType, BoardType, Task, BoardColumn } from "./types";

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
    CREATE_COLUMN(state: StoreStateType, { name }: { name: string }) {
      state.board.columns.push({
        name,
        tasks: [],
      });
    },

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

    MOVE_TASK(
      state: StoreStateType,
      {
        fromTasks,
        toTasks,
        fromTaskIndex,
        toTaskIndex,
      }: {
        fromTasks: Task[];
        toTasks: Task[];
        fromTaskIndex: number;
        toTaskIndex?: number;
      }
    ) {
      if (!toTaskIndex) toTaskIndex = toTasks.length;

      const taskToMove = fromTasks.splice(fromTaskIndex, 1)[0];
      toTasks.splice(toTaskIndex, 0, taskToMove);
    },

    MOVE_COLUMN(
      state: StoreStateType,
      { fromColumnIndex, toColumnIndex }: { fromColumnIndex: number; toColumnIndex: number }
    ) {
      const columns = state.board.columns;
      const columnToMove = columns.splice(fromColumnIndex, 1)[0];

      columns.splice(toColumnIndex, 0, columnToMove);
    },
  },
};

export type StoreType = typeof store;

export default createStore(store);
