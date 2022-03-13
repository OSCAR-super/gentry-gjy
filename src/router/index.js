import { createRouter, createWebHashHistory } from 'vue-router'
import Pick from '../views/Pick.vue'

const routes = [
  {
    path: '/',
    name: 'Pick',
    component: Pick
  },
  {
    path: '/search',
    name: 'search',
    component: () => import(/* webpackChunkName: "search" */ '../views/Search.vue')
  },
  {
    path: '/insect',
    name: 'insect',
    component: () => import(/* webpackChunkName: "insect" */ '../views/Insect.vue')
  },
  {
    path: '/show',
    name: 'show',
    component: () => import(/* webpackChunkName: "show" */ '../views/Show.vue')
  }
  // {
  //   path: '/histry',
  //   name: 'histry',
  //   component: () => import(/* webpackChunkName: "histry" */ '../views/Histry.vue')
  // },
  // {
  //   path: '/table',
  //   name: 'table',
  //   component: () => import(/* webpackChunkName: "table" */ '../views/Table.vue')
  // },
  // {
  //   path: '/finished',
  //   name: 'Finished',
  //   component: () => import(/* webpackChunkName: "finished" */ '../views/Finished.vue')
  // },
  // {
  //   path: '/add',
  //   name: 'Add',
  //   component: () => import(/* webpackChunkName: "add" */ '../views/Add.vue')
  // }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
