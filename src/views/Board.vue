<template>
  <div class="board">
    <div class="column" v-for="column in board.columns" :key="column.name">
      <div class="flex items-center mb-2 font-bold">
        {{ column.name }}
      </div>

      <div class="list-reset">
        <div class="task" v-for="task in column.tasks" :key="task.id">
          <span class="w-full flex-shrink-0 font-medium">
            {{ task.name }}
          </span>

          <span v-if="task.description" class="w-full flex-shrink-0 mt-4">
            {{ task.description }}
          </span>
        </div>
      </div>
    </div>
  </div>

  <div v-if="isTaskOpen" class="task-bg">
    <router-view />
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useStore } from "vuex";
import { useRoute } from "vue-router";

const store = useStore();
const route = useRoute();

const board = computed(() => store.state.board);
const isTaskOpen = computed(() => route.name === "Task");
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
