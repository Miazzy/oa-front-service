//import Vue from 'vue'
import VueRouter from 'vue-router'

import {
    constantRouterMap
} from '@/config/router.config'


try {
    const originalPush = VueRouter.prototype.push
    VueRouter.prototype.push = function push(location) {
        return originalPush.call(this, location).catch(err => err)
    }
} catch (e) {
    console.error(e);
}

try {
    Vue.use(VueRouter)
} catch (error) {
    console.error(error);
}

export default new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    scrollBehavior: () => ({
        y: 0
    }),
    routes: constantRouterMap
})