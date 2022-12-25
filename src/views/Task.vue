<template>
  <div class="task-view">
    <div class="flex flex-col flex-grow justify-between px-6 my-4">
      <input
        type="text"
        class="text-2xl capitalize font-medium"
        :value="task.name"
        @input="updateTaskValue($event, 'name')"
      />
      <textarea
        :value="task.description"
        class="
          mt-2 h-64 bg-transparent leading-normal 
          border-none focus:border-none focus:outline-none active:border-none active:outline-none
        "
        @input="updateTaskValue($event, 'description')"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useStore } from "vuex";
import { useRoute, useRouter } from "vue-router";

const store = useStore();
const router = useRouter();
const route = useRoute();

const getTask = computed(() => store.getters.getTask);
const task = computed(() => getTask.value(route.params.id));

if (!task.value) {
  router.replace({
    name: "Board",
  });
}

const updateTaskValue = (event: Event, key: string) => {
  const target = event.target as HTMLInputElement;
  const value = target.value;

  store.commit("UPDATE_TASK", {
    task: task.value,
    key,
    value,
  });
};
</script>

<style lang="css">
.task-view {
  @apply relative top-0 bottom-0 left-0 right-0 flex bg-white m-32 mx-auto text-left rounded shadow max-w-3xl;
}
</style>
