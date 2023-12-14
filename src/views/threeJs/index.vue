<template>
  <div class="absolute top-0 w-full bg-white">
    <div>threeJs练习</div>
    <div class="flex items-center justify-center">
      <div
        class="p-4 bg-green-300 cursor-pointer text-dark-50 hover:bg-green-400"
        v-for="item in menuList"
        @click="handleClick(item.title)"
      >
        {{ item.title }}
      </div>
    </div>
  </div>
  <component :is="getSelectMenu?.currentComponent"></component>
</template>

<script setup lang="ts">
  import { computed, defineAsyncComponent, markRaw, reactive } from 'vue';

  const menuList = [
    {
      title: '基础入门上',
      currentComponent: markRaw(defineAsyncComponent(() => import('./01-introduction/index.vue'))),
    },
    { title: '基础入门下', currentComponent: markRaw(defineAsyncComponent(() => import('./02-basic/index.vue'))) },
  ];
  const state = reactive({
    selectMenuTitle: '基础入门上',
  });

  const getSelectMenu = computed(() => {
    return menuList.find((x) => x.title === state.selectMenuTitle);
  });

  function handleClick(title: string) {
    if (state.selectMenuTitle !== title) {
      state.selectMenuTitle = title;
    }
  }
</script>

<style scoped></style>
