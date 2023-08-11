import CategoryView from '@/views/CategoryView.vue'
import { createRouter, createWebHistory } from 'vue-router'
import MainView from '../views/MainView.vue'
import CreateBookView from '../views/CreateBookView.vue'
import BookView from '../views/BookView.vue'
import MyCategoriesViewVue from '../views/MyCategoriesView.vue'
import AuthManager from '../managers/auth_manager'
import LoginView from '../views/user/LoginView.vue'
import propsParser from 'vue-router-parse-props'
import RegisterView from '../views/user/RegisterView.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/auth',
      name: 'auth',
      children: [
        {
          path: 'login',
          name: 'login',
          component: LoginView
        },
        {
          path: 'register',
          name: 'register',
          component: RegisterView
        }
      ]
    },
    {
      path: '/',
      name: 'home',
      component: MainView,
      children: [
        {
          path: '/categories/:id',
          name: 'category',
          component: CategoryView,
          props: propsParser({ id: Number })
        },
        {
          path: '/categories/:id/book',
          name: 'createBook',
          component: CreateBookView,
          props: propsParser({ id: Number })
        },
        {
          path: '/categories/:id/book/:bookId',
          name: 'bookView',
          component: BookView,
          props: propsParser({ id: Number, bookId: Number })
        },
        {
          path: '/categories',
          name: 'categories',
          component: MyCategoriesViewVue
        }
      ],
      beforeEnter: async (to) => {
        if (!(await AuthManager.isTokenValid()) && to.path !== '/auth/login') {
          return { name: 'login' }
        }
      }
    }
  ]
})

export default router
