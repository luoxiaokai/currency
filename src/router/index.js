import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [{
    path: '/',
    name: 'Main',
    component: () => import('../views/Main.vue'),
    redirect:'/home',
    children: [
      // {
      //     path: '/',
      //     name: 'home',
      //     component: () => import('../views/home/Home.vue')
      //   },
      //   {
      //     path: '/user',
      //     name: 'user',
      //     component: () => import('../views/User/User.vue')
      //   },
      //   {
      //     path: '/mall',
      //     name: 'mall',
      //     component: () => import('../views/MallMarnage/MallMarnage.vue')
      //   },
      //   {
      //     path: '/page1',
      //     name: 'page1',
      //     component: () => import('../views/Other/pageOne.vue')
      //   },
      //   {
      //     path: '/page2',
      //     name: 'page2',
      //     component: () => import('../views/Other/pageTwo.vue')
      //   }
    ]
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/Login/Login.vue')
  }
  // 
]


const router = new VueRouter({
  routes,
  mode: 'history'
})

export default router