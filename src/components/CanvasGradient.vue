<template>
  <div>
    <canvas ref="logoCanvas" id="logoCanvas"></canvas>
  </div>
</template>

<script setup lang="ts">
  import Granim from 'granim';
  import { nextTick, onMounted, ref } from 'vue';

  const logoCanvas = ref(null);

  nextTick(() => {
    new Granim({
      element: logoCanvas.value,
      name: 'granim',
      opacity: [1, 1],
      states: {
        'default-state': {
          gradients: [
            ['#834D9B', '#D04ED6'],
            ['#1CD8D2', '#93EDC7'],
          ],
        },
      },
    });
  });

  onMounted(() => {
    // setCanvasFullSize();
  });

  // function getCanvas() {
  //   const el = <HTMLCanvasElement>document.getElementById('logoCanvas');
  //   return el.getContext('2d')!;
  // }

  // /**
  //  * canvas全屏
  //  * @param cxt canvas 2d对象
  //  */
  // function setCanvasFullSize() {
  //   const { innerWidth, innerHeight } = window;
  //   const el = <HTMLCanvasElement>document.getElementById('logoCanvas');
  //   el.width = innerWidth;
  //   el.height = innerHeight;
  // }

  // /**
  //  *
  //  * @param cxt canvas 2d对象
  //  */
  // function setStyle(cxt: CanvasRenderingContext2D) {
  //   cxt.moveTo(50, 50);
  //   cxt.lineTo(200, 50);
  //   cxt.lineWidth = 20;
  //   cxt.strokeStyle = 'pink';
  //   cxt.lineCap = 'round'; // 默认: butt; 圆形: round; 方形: square
  //   cxt.stroke();
  // }

  // /**
  //  * 设置线性渐变
  //  * @param cxt canvas 2d对象
  //  */
  // function setLinearGradient(cxt?: CanvasRenderingContext2D) {
  //   if (!cxt) {
  //     cxt = getCanvas();
  //   }
  //   const { innerWidth, innerHeight } = window;
  //   const linearGradient = cxt.createLinearGradient(0, 0, innerWidth, innerHeight);
  //   linearGradient.addColorStop(0, 'skyblue');
  //   linearGradient.addColorStop(1, 'darkturquoise');
  //   cxt.fillStyle = linearGradient;
  //   cxt.fillRect(0, 0, innerWidth, innerHeight);
  // }
</script>

<style scoped>
  #logoCanvas {
    position: absolute;
    width: 100%;
    height: 100%;
    z-index: -1;
    background-size: cover;
    background-position: 0 85%;
  }
</style>
