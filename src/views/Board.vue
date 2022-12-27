<template>
  <form class="group/title flex items-center gap-4 px-4 py-2" @submit.prevent="updateBoardName">
    <input
      class="
        text-white text-3xl font-medium capitalize 
        bg-transparent w-auto max-w-full flex-1
        focus:border-none focus:outline-none
      "
      v-model="boardName"
      id="board-name-input"
      @input="updateBoardName"
    />

    <label
      for="board-name-input"
      class="translate-y-1 origin-right scale-x-0 group-hover/title:scale-x-100 transition-transform"
    >
      <EditIcon class="text-gray-400 text-3xl" />
    </label>
  </form>

  <div class="board">
    <BoardColumn
      v-for="(column, columnIndex) in board.columns"
      :key="column.name"
      :column="column"
      :columnIndex="columnIndex"
    />

    <form
      class="bg-gray-200 px-2 max-h-[90%] min-w-[20rem] text-left shadow rounded overflow-hidden hover:overflow-auto"
      @submit.prevent="createColumn"
    >
      <input
        type="text"
        placeholder="+ New Column"
        class="w-full p-2 font-bold bg-transparent border-none outline-none capitalize"
        v-model="newColumnName"
      />
    </form>
  </div>

  <div v-if="isTaskOpen" class="task-bg" @click.self="closeModal">
    <router-view />
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import { useStore } from "vuex";
import { useRoute, useRouter } from "vue-router";

import BoardColumn from "../components/BoardColumn.vue";
import EditIcon from "../components/EditIcon.vue";

import type { StoreStateType } from "../store/types";

const store = useStore<StoreStateType>();
const route = useRoute();
const router = useRouter();

const board = computed(() => store.state.board);
const isTaskOpen = computed(() => route.name === "Task");

const boardName = ref(store.state.board?.name);
const newColumnName = ref("");

const updateBoardName = () => {
  store.commit("UPDATE_NAME", { name: boardName.value });
};

const closeModal = () => {
  router.push({
    name: "Board",
  });
};

const createColumn = () => {
  const value = newColumnName.value;
  if (!value) return;

  store.commit("CREATE_COLUMN", { name: value });
  newColumnName.value = "";
};
</script>

<style lang="css">
.board {
  @apply flex items-start gap-4 p-4 overflow-auto min-h-full;
}

.board > * {
  @apply flex-1 min-w-[18.75rem];
}

.task {
  @apply flex items-center flex-wrap shadow mb-2 py-2 px-2 rounded bg-white text-gray-900 no-underline;
}

.task-bg {
  @apply fixed top-0 bottom-0 right-0 left-0;
  background: rgba(0, 0, 0, 0.5);
}
</style>
