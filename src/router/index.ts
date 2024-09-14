import { createRouter, createWebHistory } from 'vue-router'

import PageOne from '@/components/pageOne.vue'
import PageTwo from '@/components/pageTwo.vue'
import detail from '@/components/detail.vue'
const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/pageOne',
      component: PageOne
    },
    {
      name: 'second',
      path: '/pageTwo',
      component: PageTwo,
      children: [
        {
          path: '/detail',
          name: 'detail/:id/:title',
          component: detail,
          props: true
        }
      ]
    },
    {
      path: '/',
      redirect: '/home'
    }
  ]
})

export default router
