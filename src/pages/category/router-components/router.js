import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

import List from './product-list'
import Product from './gamer-product'

let routes = [
  {path: '/', redirect: List},
  {path: '/all', component: List, name: 'all'},
  {path: '/game', component: List, name: 'game'},
  {path: '/super', component: List, name: 'super'},
  {path: '/product', component: Product, name: 'product'}
]

let router = new Router({
  routes
})

export default router
