const routes = [
  {
    path: '/',
    name: 'Index',
    title: '首页',
    component: () => import('@/views/home/index.vue'),
  },
  {
    path: '/wallpaper',
    name: 'Wallpaper',
    title: '壁纸',
    component: () => import('@/views/wallpaper/index.vue'),
  },
  {
    path: '/threeJs',
    name: 'ThreeJs',
    title: 'threeJs 学习',
    component: () => import('@/views/threeJs/index.vue'),
  },
];
export default routes;
