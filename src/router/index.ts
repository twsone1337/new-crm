import { createWebHistory, createRouter } from 'vue-router';

import Orders from '../pages/Orders.vue';
import Packages from '../pages/Packages.vue';
import Products from '../pages/Products.vue';
import Users from '../pages/Users.vue';
import Login from '../pages/Login.vue';

const routes = [
  { path: '/', name: 'orders', component: Orders },
  { path: '/packages', name: 'packages', component: Packages },
  { path: '/products', name: 'products', component: Products },
  { path: '/users', name: 'users', component: Users },
  { path: '/login', name: 'login', component: Login },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
