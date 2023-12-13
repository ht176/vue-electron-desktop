import router from '@/router/index';
import { createApp } from 'vue';
import App from './App.vue';
import './style.css';

function bootstrap() {
  const app = createApp(App);

  app.use(router);

  app.mount('#app').$nextTick(() => {
    // Remove Preload scripts loading
    postMessage({ payload: 'removeLoading' }, '*');

    // Use contextBridge
    window.ipcRenderer.on('main-process-message', (_event, message) => {
      console.log(message);
    });
  });
}

bootstrap();
