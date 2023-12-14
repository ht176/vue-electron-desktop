<script setup lang="ts">
  import { useRouter } from 'vue-router';
  defineProps<{ msg: string }>();
  const route = useRouter();
  function handleStartClick() {
    window.ipcRenderer.send('set-wallpaper', '壁纸', 'wallpaper');
  }

  function handleStopClick() {
    window.ipcRenderer.send('stop-wallpaper', '壁纸', 'wallpaper');
  }

  function handleThreeClick() {
    route.push({ path: '/ThreeJs' });
  }
</script>

<template>
  <h1>{{ msg }}</h1>

  <div class="card">
    <button type="button" @click="handleStartClick">设置背景</button>
    <button type="button" @click="handleStopClick">关闭背景</button>
    <button type="button" @click="handleThreeClick">threejs</button>
  </div>
</template>

<style scoped>
  .read-the-docs {
    color: #888;
  }
</style>
