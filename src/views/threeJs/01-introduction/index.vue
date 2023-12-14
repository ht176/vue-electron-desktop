<template>
  <div>
    <canvas class="threeCanvas"></canvas>
  </div>
</template>

<script setup lang="ts">
  import {
    BoxGeometry,
    Mesh,
    MeshBasicMaterial,
    Object3DEventMap,
    PerspectiveCamera,
    Scene,
    WebGLRenderer,
  } from 'three';
  import { onMounted } from 'vue';

  onMounted(() => {
    init();
  });

  function init() {
    const sizes = {
      width: window.innerWidth,
      height: window.innerHeight,
    };

    // 初始化渲染器
    const canvas = document.querySelector('.threeCanvas')!;
    const renderer = new WebGLRenderer({ canvas: canvas });
    //初始化场景
    const scene = new Scene();
    //初始化相机
    const camera = new PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100);
    console.log(sizes.width, sizes.height);

    renderer.setSize(sizes.width, sizes.height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    camera.position.z = 3;
    scene.add(camera);

    const geometry = new BoxGeometry(1, 1, 1);
    const material = new MeshBasicMaterial({ color: '#666' });
    const mesh = new Mesh(geometry, material);
    scene.add(mesh);
    tick(renderer, scene, camera, mesh);

    // 页面缩放事件监听
    window.addEventListener('resize', () => {
      sizes.width = window.innerWidth;
      sizes.height = window.innerHeight;
      // 更新渲染
      renderer.setSize(sizes.width, sizes.height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      // 更新相机
      camera.aspect = sizes.width / sizes.height;
      camera.updateProjectionMatrix();
    });
  }

  const tick = (
    render: WebGLRenderer,
    scene: Scene,
    camera: PerspectiveCamera,
    mesh: Mesh<BoxGeometry, MeshBasicMaterial, Object3DEventMap>
  ) => {
    render.render(scene, camera);
    // 给网格模型添加一个转动动画
    mesh && (mesh.rotation.y += 0.009);
    mesh && (mesh.rotation.x += 0.009);
    // 页面重绘时调用自身
    window.requestAnimationFrame(() => tick(render, scene, camera, mesh));
  };
</script>

<style scoped></style>
