import { createMemoryHistory, createRouter } from 'vue-router';

import Orders from '../pages/Orders.vue';
import Packages from '../pages/Packages.vue';
import Products from '../pages/Products.vue';
import Users from '../pages/Users.vue';

const routes = [
  { path: '/', component: Orders },
  { path: '/packages', component: Packages },
  { path: '/products', component: Products },
  { path: '/users', component: Users },
];

const router = createRouter({
  history: createMemoryHistory(),
  routes,
});

export default router;
