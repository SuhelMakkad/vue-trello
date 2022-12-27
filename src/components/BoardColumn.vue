<template>
  <div
    class="column"
    :draggable="true"
    @dragover.prevent
    @dragenter.prevent
    @drop="moveTaskOrColumn($event, column.tasks, columnIndex)"
    @dragstart.self="pickupColumn($event, columnIndex)"
  >
    <div class="flex items-center sticky top-0 bg-gray-200 pt-2 mb-2 font-bold capitalize">
      {{ column.name }}
    </div>

    <div class="list-reset">
      <BoardTask
        v-for="(task, taskIndex) in column.tasks"
        :key="task?.id"
        :task="task"
        @drop-task="moveTaskOrColumn($event, column.tasks, columnIndex, taskIndex)"
        @drag-start="pickupTask($event, taskIndex, columnIndex)"
      />

      <input
        type="text"
        placeholder="+ Enter New Task"
        class="sticky bottom-0 bg-gray-200 w-full p-2 pb-4 bg-transparent border-none outline-none"
        @keyup.enter="createTask($event, column.name)"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useStore } from "vuex";

import BoardTask from "./BoardTask.vue";

import { v4 as uuid } from "uuid";
import type { BoardColumnType, StoreStateType, Task } from "../store/types";

defineProps<{ column: BoardColumnType; columnIndex: number }>();

const store = useStore<StoreStateType>();

const board = computed(() => store.state.board);

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

<style scoped>
.column {
  @apply bg-gray-200 px-2 max-h-[90%] text-left shadow rounded overflow-hidden hover:overflow-auto;
  min-width: 350px;
}
</style>