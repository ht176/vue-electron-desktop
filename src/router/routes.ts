const routes = [
  {
    path: '/',
    name: 'index',
    title: '首页',
    component: () => import('@/views/home/index.vue'),
  },
  {
    path: '/wallpaper',
    name: 'wallpaper',
    title: '壁纸',
    component: () => import('@/views/wallpaper/index.vue'),
  },
];
export default routes;
