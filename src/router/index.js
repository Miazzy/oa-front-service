//import Vue from 'vue'
import Router from 'vue-router'

import {
    constantRouterMap
} from '@/config/router.config'


try {
    const originalPush = Router.prototype.push
    Router.prototype.push = function push(location) {
        return originalPush.call(this, location).catch(err => err)
    }
} catch (e) {
    console.error(e);
}

try {
    Vue.use(Router)
} catch (error) {
    console.error(error);
}

export default new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    scrollBehavior: () => ({
        y: 0
    }),
    routes: constantRouterMap
})