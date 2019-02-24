import '@/modules/js/leanCloud-init'

import Vue from 'vue'
import {miro} from '@/components/miro/miro-ui.js'
Vue.use(miro)

import Header from '@/components/miro-header.vue'
Vue.component('miro-header',Header)

let mixin = {}

export default mixin
