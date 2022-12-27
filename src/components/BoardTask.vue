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
      <span
        class="flex-shrink-0 w-full max-w-full overflow-hidden text-ellipsis font-medium capitalize"
        :class="{ 'text-gray-400': !task.name }"
      >
        {{ task.name || "Untitled" }}
      </span>

      <span v-if="task.description" class="w-full flex-shrink-0 mt-2 capitalize leading-normal">
        {{ truncatedDescription }}
      </span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useRouter } from "vue-router";

import type { Task } from "../store/types";

const props = defineProps<{ task: Task }>();

const emits = defineEmits<{
  (e: "drag-start", event: DragEvent): void;
  (e: "drop-task", event: DragEvent): void;
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

const dragstart = (event: DragEvent) => {
  emits("drag-start", event);
};

const drop = (event: DragEvent) => {
  emits("drop-task", event);
};
</script>
