//import Vue from 'vue'
import Vuex from 'vuex'

import app from './modules/app'
import user from './modules/user'
import permission from './modules/permission'
import getters from './getters'

import state from './state'
import mutations from './mutations'
import actions from './actions'
import common from './modules/common'
import menu from './modules/menu'
import {
    getStore,
    setStore
} from '@/assets/js/storage'

Vue.use(Vuex)

export default new Vuex.Store({
    modules: {
        app,
        user,
        permission,
        common,
        menu,
    },
    state,
    mutations,
    actions,
    getters
})