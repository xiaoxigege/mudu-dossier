import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'Dashboard',
      component: () => import('@/views/Dashboard.vue'),
      meta: { title: '总览' },
    },
    {
      path: '/cases',
      name: 'CaseList',
      component: () => import('@/views/CaseList.vue'),
      meta: { title: '案件列表' },
    },
    {
      path: '/cases/:id',
      name: 'CaseDetail',
      component: () => import('@/views/CaseDetail.vue'),
      meta: { title: '案件详情' },
    },
    {
      path: '/characters',
      name: 'CharacterHub',
      component: () => import('@/views/CharacterHub.vue'),
      meta: { title: '人物档案' },
    },
    {
      path: '/timeline',
      name: 'Timeline',
      component: () => import('@/views/Timeline.vue'),
      meta: { title: '时间线' },
    },
    {
      path: '/challenge',
      name: 'Challenge',
      component: () => import('@/views/Challenge.vue'),
      meta: { title: '案件闯关' },
    },
  ],
})

router.beforeEach((to) => {
  document.title = `${to.meta.title || '默读'} — 默读案卷管理系统`
})

export default router
