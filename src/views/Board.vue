<template>
  <div class="board">
    <div
      class="column"
      v-for="(column, columnIndex) in board.columns"
      :key="column.name"
      :draggable="true"
      @dragover.prevent
      @dragenter.prevent
      @drop="moveTaskOrColumn($event, column.tasks, columnIndex)"
      @dragstart.self="pickupColumn($event, columnIndex)"
    >
      <div class="flex items-center mb-2 font-bold">
        {{ column.name }}
      </div>

      <div class="list-reset">
        <div
          v-for="(task, taskIndex) in column.tasks"
          class="cursor-pointer"
          :key="task?.id"
          @click="openModal(task?.id)"
        >
          <div
            v-if="task"
            class="task"
            :draggable="true"
            @dragover.prevent
            @dragenter.prevent
            @dragstart="pickupTask($event, taskIndex, columnIndex)"
            @drop.stop="moveTaskOrColumn($event, column.tasks, columnIndex, taskIndex)"
          >
            <span class="w-full flex-shrink-0 font-medium">
              {{ task.name }}
            </span>

            <span v-if="task.description" class="w-full flex-shrink-0 mt-4">
              {{ task.description }}
            </span>
          </div>
        </div>

        <input
          type="text"
          placeholder="+ Enter New Task"
          class="w-full p-2 bg-transparent border-none outline-none"
          @keyup.enter="createTask($event, column.name)"
        />
      </div>
    </div>

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

import { v4 as uuid } from "uuid";

import type { StoreStateType } from "../store/types";
import type { Task } from "../store/types";

const store = useStore<StoreStateType>();
const route = useRoute();
const router = useRouter();

const board = computed(() => store.state.board);
const isTaskOpen = computed(() => route.name === "Task");

const openModal = (id: string) => router.push({ name: "Task", params: { id } });

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

const createTask = (event: KeyboardEvent, columnName: string) => {
  const target = event.target as HTMLInputElement;
  const value = target.value;

  const task: Task = {
    id: uuid(),
    description: "",
    name: value,
  };

  store.commit("CREATE_TASK", {
    task,
    columnName,
  });

  target.value = "";
};

const pickupTask = (event: DragEvent, taskIndex: number, columnIndex: number) => {
  if (!event.dataTransfer) return;

  event.dataTransfer.effectAllowed = "move";
  event.dataTransfer.dropEffect = "move";

  event.dataTransfer.setData("task-index", taskIndex.toString());
  event.dataTransfer.setData("from-column-index", columnIndex.toString());
  event.dataTransfer.setData("drag-type", "task");
};

const pickupColumn = (event: DragEvent, fromColumnIndex: number) => {
  if (!event.dataTransfer) return;

  event.dataTransfer.effectAllowed = "move";
  event.dataTransfer.dropEffect = "move";

  event.dataTransfer.setData("column-index", fromColumnIndex.toString());
  event.dataTransfer.setData("drag-type", "column");
};

const moveTaskOrColumn = (
  event: DragEvent,
  toTasks: Task[],
  columnIndex: number,
  taskIndex?: number
) => {
  if (!event.dataTransfer) return;

  const type = event.dataTransfer.getData("drag-type");

  if (type === "task") {
    moveTask(event, toTasks, taskIndex);
  } else if (type === "column") {
    moveColumn(event, columnIndex);
  }
};

const moveTask = (event: DragEvent, toTasks: Task[], toTaskIndex?: number) => {
  if (!event.dataTransfer) return;

  const fromTaskIndex = +event.dataTransfer.getData("task-index");
  const fromColumnIndex = +event.dataTransfer.getData("from-column-index");
  const fromTasks = board.value.columns[fromColumnIndex].tasks;

  store.commit("MOVE_TASK", {
    fromTasks,
    toTasks,
    fromTaskIndex,
    toTaskIndex,
  });
};

const moveColumn = (event: DragEvent, toColumnIndex: number) => {
  if (!event.dataTransfer) return;

  const fromColumnIndex = +event.dataTransfer.getData("column-index");

  store.commit("MOVE_COLUMN", {
    fromColumnIndex,
    toColumnIndex,
  });
};
</script>

<style lang="css">
.board {
  @apply flex items-start;
}

.task {
  @apply flex items-center flex-wrap shadow mb-2 py-2 px-2 rounded bg-white text-gray-900 no-underline;
}

.column {
  @apply bg-gray-200 p-2 mr-4 text-left shadow rounded;
  min-width: 350px;
}

.board {
  @apply p-4 bg-slate-700 h-full overflow-auto;
}

.task-bg {
  @apply fixed top-0 bottom-0 right-0 left-0;
  background: rgba(0, 0, 0, 0.5);
}
</style>
