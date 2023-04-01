import {
  createRouter,
  // createWebHistory,
  createWebHashHistory
} from 'vue-router';
import { routes } from './config';
import middleware from './middleware';

/**
 * 目前选用了createWebHashHistory，保证兼容性
 */
const router = createRouter({
  // history: createWebHistory(import.meta.env.BASE_URL),
  history: createWebHashHistory(),
  routes
});

// 执行中间件
middleware(router);

export default router;
