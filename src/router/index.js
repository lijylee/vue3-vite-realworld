import { createRouter, createWebHashHistory } from 'vue-router';
import { getUserFromStorage } from '../utils/storage';
import Layout from '../components/Layout.vue';
import Home from '../pages/Home.vue';
import Login from '../pages/Login.vue';
import Register from '../pages/Register.vue';

const routes = [
  {
    path: '/',
    component: Layout,
    name: 'Layout',
    children: [
      {
        path: '',
        component: Home,
        name: 'Home'
      }
    ],
  },
  {
    path: '/login',
    component: Login,
    name: 'Login'
  },
  ,
  {
    path: '/register',
    component: Register,
    name: 'Register'
  }
];

const router = createRouter({
  history: createWebHashHistory(),
  routes
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
