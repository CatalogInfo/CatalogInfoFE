import CategoryView from '@/views/CategoryView.vue'

import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import CreateBookView from '../views/CreateBookView.vue'
import BookView from '../views/BookView.vue'
import MyCategoriesViewVue from '../views/MyCategoriesView.vue'
import CategoryManager from '@/managers/category_manager'
import AuthManager from "../managers/auth_manager"

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
      props: true,
    },
    {
      path: '/categories/:id/book',
      name: 'createBook',
      component: CreateBookView,
      props: true,
    },
    {
      path: '/categories/:id/book/:bookId',
      name: 'bookView',
      component: BookView,
      props: true,
    },
    {
      path: '/create',
      name: 'about',
      component: MyCategoriesViewVue
    }
  ]
})
router.beforeEach(async (to, from, next) => {
  await CategoryManager.loadAll();
  if (!(await AuthManager.isTokenValid())) {
    next({ name: "login" });
  } else {
    next();
  }
})
export default router
