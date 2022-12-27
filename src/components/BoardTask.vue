<template>
  <div
    v-if="task"
    class="task cursor-pointer group/task"
    :draggable="true"
    @dragover.prevent
    @dragenter.prevent
    @dragstart="dragstart"
    @drop.stop="drop"
    @click="openModal(task?.id)"
  >
    <div class="flex items-center justify-between w-full max-w-full">
      <span
        class="flex-shrink-0 flex-1 overflow-hidden text-ellipsis font-medium capitalize"
        :class="{ 'text-gray-400': !task.name }"
      >
        {{ task.name || "Untitled" }}
      </span>

      <button
        class="transition-transform origin-right scale-x-0 group-hover/task:scale-x-100"
        @click.prevent="deleteTask"
      >
        <DeleteIcon class="text-red-400 shrink-0 w-6" />
      </button>
    </div>

    <span v-if="task.description" class="w-full flex-shrink-0 mt-2 capitalize leading-normal">
      {{ truncatedDescription }}
    </span>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useRouter } from "vue-router";

import DeleteIcon from "./DeleteIcon.vue";

import type { Task } from "../store/types";

const props = defineProps<{ task: Task }>();

const emits = defineEmits<{
  (e: "drag-start", event: DragEvent): void;
  (e: "drop-task", event: DragEvent): void;
  (e: "delete-task", event: MouseEvent): void;
}>();

const router = useRouter();

const truncatedDescription = computed(() => {
  const description = props.task.description;
  if (!description) return;

  const maxLength = 75;
  if (description.length < maxLength) {
    return description;
  }

  return `${description.substring(0, maxLength)}...`;
});

const openModal = (id: string) => router.push({ name: "Task", params: { id } });

const dragstart = (event: DragEvent) => emits("drag-start", event);

const drop = (event: DragEvent) => emits("drop-task", event);

const deleteTask = (event: MouseEvent) => emits("delete-task", event);
</script>
