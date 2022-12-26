<template>
  <div class="board">
    <BoardColumn
      v-for="(column, columnIndex) in board.columns"
      :key="column.name"
      :column="column"
      :columnIndex="columnIndex"
    />

    <div class="column">
      <input
        type="text"
        placeholder="+ New Column"
        class="w-full p-2 font-bold bg-transparent border-none outline-none"
        @keyup.enter="createColumn"
      />
    </div>
  </div>

  <div v-if="isTaskOpen" class="task-bg" @click.self="closeModal">
    <router-view />
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useStore } from "vuex";
import { useRoute, useRouter } from "vue-router";

import BoardColumn from "../components/BoardColumn.vue";

import type { StoreStateType } from "../store/types";

const store = useStore<StoreStateType>();
const route = useRoute();
const router = useRouter();

const board = computed(() => store.state.board);
const isTaskOpen = computed(() => route.name === "Task");

const closeModal = () => {
  router.push({
    name: "Board",
  });
};

const createColumn = (event: KeyboardEvent) => {
  const target = event.target as HTMLInputElement;
  const value = target.value;

  store.commit("CREATE_COLUMN", { name: value });
  target.value = "";
};
</script>

<style lang="css">
.board {
  @apply flex items-start;
}

.task {
  @apply flex items-center flex-wrap shadow mb-2 py-2 px-2 rounded bg-white text-gray-900 no-underline;
}

.board {
  @apply p-4 bg-slate-700 h-full overflow-auto;
}

.task-bg {
  @apply fixed top-0 bottom-0 right-0 left-0;
  background: rgba(0, 0, 0, 0.5);
}
</style>
