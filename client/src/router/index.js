import { createRouter, createWebHistory } from 'vue-router'
import Swal from "sweetalert2";
import LoginView from '../views/LoginView.vue'
import RegisterView from '../views/RegisterView.vue'
import LandingView from '../views/LandingView.vue'
import ProductView from '../views/ProductView.vue'
import BookmarkView from '../views/BookmarkView.vue'
import DetailView from '../views/DetailView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'landing-page',
      component: LandingView
    },
    {
      path: '/login',
      name: 'customer-login',
      component: LoginView
    },
    {
      path: '/register',
      name: 'customer-register',
      component: RegisterView
    },
    {
      path: '/accomodations',
      name: 'customer-accomodations',
      component: ProductView
    },
    {
      path: '/bookmarks',
      name: 'customer-bookmark',
      component: BookmarkView
    },
    {
      path: '/accomodations/:id',
      name: 'accom-detail',
      component: DetailView
    }
  ]
})

router.beforeEach(async (to, from) => {
  if (!localStorage.access_token && to.name === 'customer-bookmark') {
    Swal.fire({
      icon: 'error',
      title: 'Login First!',
      text: 'Log in to access bookmarks'
    })
    return { path: "/login" };
  } else if (localStorage.access_token && to.name === 'customer-login') {
    Swal.fire({
      icon: 'error',
      title: 'Already logged in!',
      text: 'Already logged in'
    })
    return { path: "/accomodations" };
  }
})

export default router
