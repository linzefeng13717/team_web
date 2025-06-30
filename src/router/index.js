import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: () => import('@/views/Home.vue')
    },
    {
      path: '/leaders',
      name: 'Leaders',
      component: () => import('@/views/Leaders.vue')
    },
    {
      path: '/members',
      name: 'Members',
      component: () => import('@/views/members.vue')
    },
    {
      path: '/research',
      name: 'Research',
      component: () => import('@/views/Research.vue')
    },
    {
      path: '/admission',
      name: 'Admission',
      component: () => import('@/views/Admission.vue')
    },
    {
      path: '/papers',
      name: 'Papers',
      component: () => import('@/views/Papers.vue')
    },
    {
      path: '/sponsor',
      name: 'Sponsor',
      component: () => import('@/views/Sponsor.vue')
    },
    {
      path: '/partner',
      name: 'Partner',
      component: () => import('@/views/Partner.vue')
    },
  ]
})

export default router 