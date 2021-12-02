import { createRouter, createWebHashHistory } from 'vue-router'
import File from '../views/File.vue'

const routes = [
  {
    path: '/',
    name: 'File',
    component: File
  },
  {
    path: '/histry',
    name: 'histry',
    component: () => import(/* webpackChunkName: "histry" */ '../views/Histry.vue')
  },
  {
    path: '/table',
    name: 'table',
    component: () => import(/* webpackChunkName: "table" */ '../views/Table.vue')
  },
  {
    path: '/finished',
    name: 'Finished',
    component: () => import(/* webpackChunkName: "finished" */ '../views/Finished.vue')
  },
  {
    path: '/add',
    name: 'Add',
    component: () => import(/* webpackChunkName: "add" */ '../views/Add.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
