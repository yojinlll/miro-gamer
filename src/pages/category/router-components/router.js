import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

// import List from './product-list'
// import Product from './gamer-product'
const List = () => import('./product-list.vue')
const Product = () => import('./gamer-product.vue')

let routes = [
  {path: '/', redirect: List},
  {path: '/all', component: List, name: 'all'},
  {path: '/game', component: List, name: 'game'},
  {path: '/super', component: List, name: 'super'},
  {path: '/product', component: Product, name: 'product'}
]

let router = new Router({
  routes,
  scrollBehavior (to, from, savedPosition) {
    return { x: 0, y: 0 }
  }
})

export default router
