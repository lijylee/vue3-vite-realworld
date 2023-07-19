import { createRouter, createWebHashHistory } from 'vue-router';
import { getUserFromStorage } from '@/utils/storage';
import Layout from '@/components/Layout.vue';
import Home from '@/pages/Home.vue';
import Login from '@/pages/Login.vue';
import Register from '@/pages/Register.vue';

const routes = [
  {
    path: '/',
    component: Layout,
    name: 'Layout',
    children: [
      {
        path: '',
        component: Home,
        name: 'Index'
      },
      {
        path: '/home',
        component: Home,
        name: 'Home'
      },
      {
        path: '/profile/:username?',
        component: () => import(/* webpackChunkName: "profile" */ '@/pages/Profile.vue'),
        name: 'Profile'
      },
      {
        path: '/settings',
        component: () => import(/* webpackChunkName: "settings" */ '@/pages/Settings.vue'),
        name: 'Settings'
      },
      {
        path: '/editor',
        component: () => import(/* webpackChunkName: "editor" */ '@/pages/Editor.vue'),
        name: 'Editor'
      },
      {
        path: '/article/:slug',
        component: () => import(/* webpackChunkName: "article" */ '@/pages/Article.vue'),
        name: 'Article'
      }
    ],
  },
  {
    path: '/login',
    component: Login,
    name: 'Login'
  },
  {
    path: '/register',
    component: Register,
    name: 'Register'
  }
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
  // linkActiveClass: 'active',
  // linkExactActiveClass: 'active'
});

router.beforeEach(async (to, from) => {
  const user = getUserFromStorage();
  if (
    // 检查用户是否已登录
    !user &&
    // ❗️ 避免无限重定向
    to.name !== 'Login' &&
    to.name !== 'Register'
  ) {
    // 将用户重定向到登录页面
    return { name: 'Login' };
  }
});

export default router;
