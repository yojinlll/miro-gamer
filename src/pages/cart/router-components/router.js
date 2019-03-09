import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

// import Unpaid from './goods-unpaid'
// import Paid from './goods-paid'
const Unpaid = () => import('./goods-unpaid.vue')
const Paid = () => import('./goods-paid.vue')

let routes = [
  {path: '/', redirect: {name: 'cart'}},
  {path: '/cart', component: Unpaid, name: 'cart'},
  {path: '/order', component: Paid, name: 'order'}
]

let router = new Router({
  routes
})

export default router
