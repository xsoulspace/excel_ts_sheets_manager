import home from '#/screens/home.vue'
import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: home,
  },
]

export const appRouter = createRouter({
  history: createWebHashHistory(),
  routes,
})
