<template>
  <div class="cursor-pointer" @click="openModal(task?.id)">
    <div
      v-if="task"
      class="task"
      :draggable="true"
      @dragover.prevent
      @dragenter.prevent
      @dragstart="dragstart"
      @drop.stop="drop"
    >
      <span class="w-full flex-shrink-0 font-medium">
        {{ task.name }}
      </span>

      <span v-if="task.description" class="w-full flex-shrink-0 mt-4">
        {{ task.description }}
      </span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";

import type { Task } from "../store/types";

defineProps<{ task: Task }>();

const emits = defineEmits<{
  (e: "drag-start", event: DragEvent): void;
  (e: "drop-task", event: DragEvent): void;
}>();

const router = useRouter();

const openModal = (id: string) => router.push({ name: "Task", params: { id } });

const dragstart = (event: DragEvent) => {
  emits("drag-start", event);
};

const drop = (event: DragEvent) => {
  emits("drop-task", event);
};
</script>

<style scoped>
.column {
  @apply bg-gray-200 p-2 mr-4 text-left shadow rounded;
  min-width: 350px;
}
</style>
