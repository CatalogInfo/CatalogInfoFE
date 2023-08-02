import CategoryView from '@/views/CategoryView.vue'

import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import CreateBookView from '../views/CreateBookView.vue'
import BookView from '../views/BookView.vue'
import MyCategoriesViewVue from '../views/MyCategoriesView.vue'
import CategoryManager from '@/managers/category_manager'
import AuthManager from "../managers/auth_manager"
import LoginView from "../views/user/LoginView.vue"
import LogoutView from "../views/user/LogoutView.vue"
import RegisterView from "../views/user/RegisterView.vue"



const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/auth",
      name: "auth",
      children: [
        {
          path: "login",
          name: "login",
          component: LoginView,
        },
        {
          path: "logout",
          name: "logout",
          component: LogoutView,
        },
        {
          path: "register",
          name: "register",
          component: RegisterView,
        },
      ],
    },
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
router.beforeEach(async (to, from) => {
  // await CategoryManager.loadAll();
  if (
    // make sure the user is authenticated
    !(await AuthManager.isTokenValid()) &&
    // ❗️ Avoid an infinite redirect
    to.name !== 'login'
  ) {
    // redirect the user to the login page
    return { name: 'login' }
  }
})

export default router
