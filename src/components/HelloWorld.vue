<script setup lang="ts">
  defineProps<{ msg: string }>();

  function handleStartClick() {
    window.ipcRenderer.send('set-wallpaper', '壁纸', 'wallpaper');
  }

  function handleStopClick() {
    window.ipcRenderer.send('stop-wallpaper', '壁纸', 'wallpaper');
  }
</script>

<template>
  <h1>{{ msg }}</h1>

  <div class="card">
    <button type="button" @click="handleStartClick">设置背景</button>
    <button type="button" @click="handleStopClick">关闭背景</button>
  </div>
</template>

<style scoped>
  .read-the-docs {
    color: #888;
  }
</style>
