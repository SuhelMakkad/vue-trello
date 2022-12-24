<template>
  <div class="board">
   {{ board }}
  </div>
</template>

<script lang="ts">
import { mapState } from "vuex";

export default {
  computed: mapState(["board"]),
};
</script>

<style lang="css">
.task {
  @apply flex items-center flex-wrap shadow mb-2 py-2 px-2 rounded bg-white text-gray-900 no-underline;
}

.column {
  @apply bg-gray-200 p-2 mr-4 text-left shadow rounded;
  min-width: 350px;
}

.board {
  @apply p-4 bg-teal-900 h-full overflow-auto;
}

.task-bg {
  @apply absolute;
  background: rgba(0, 0, 0, 0.5);
}
</style>
