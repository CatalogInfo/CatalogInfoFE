import CategoryView from '@/views/CategoryView.vue'

import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import CreateBookView from '../views/CreateBookView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/categories/:id',
      name: 'categories',
      component: CategoryView,
      props: true
      // children: [
      //     {
      //       path: 'book',
      //       name: 'createBok',
      //       component: CreateBookView,
      //       props: true
      //     }
      // ]
    },
    {
      path: '/categories/:id/book',
      name: 'createBook',
      component: CreateBookView,
      props: true
    },
    {
      path: '/create',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/MyCategoriesView.vue')
    }
  ]
})

export default router
