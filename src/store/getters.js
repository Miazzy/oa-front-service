//import Vue from 'vue'
import {
    USER_INFO
} from "@/store/mutation-types"
const getters = {
    device: state => state.app.device,
    theme: state => state.app.theme,
    color: state => state.app.color,
    token: state => state.user.token,
    avatar: state => {
        try {
            state.user.avatar = Vue.ls.get(USER_INFO).avatar;
            return state.user.avatar
        } catch (error) {
            console.log(error);
        }
    },
    username: state => state.user.username,
    nickname: state => {
        try {
            state.user.realname = Vue.ls.get(USER_INFO).realname;
            return state.user.realname
        } catch (error) {
            console.error(error);
        }
    },
    welcome: state => state.user.welcome,
    permissionList: state => state.user.permissionList,
    userInfo: state => {
        try {
            state.user.info = Vue.ls.get(USER_INFO);
            return state.user.info
        } catch (error) {
            console.error(error);
        }
    },
    addRouters: state => state.permission.addRouters
}

export default getters