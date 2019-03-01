import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

import All from './gamer-all'
import Game from './gamer-game'
import Super from './gamer-super'
import Product from './gamer-product'

let routes = [
  {path: '/', redirect: All},
  {path: '/all', component: All, name: 'all'},
  {path: '/game', component: Game, name: 'game'},
  {path: '/super', component: Super, name: 'super'},
  {path: `/product`, component: Product, name: 'product'}
]

let router = new Router({
  routes
})

export default router
