import { Store } from "vuex";
import type { StoreStateType } from "../store/types";

export const saveStatePlugin = (store: Store<StoreStateType>) => {
  store.subscribe((mutation, state) => {
    localStorage.setItem("board", JSON.stringify(state.board));
  });
};
