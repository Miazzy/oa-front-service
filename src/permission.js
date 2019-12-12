import Vue from 'vue';
import router from './router';
import store from './store';
import NProgress from 'nprogress'; // progress bar
import 'nprogress/nprogress.css'; // progress bar style
import notification from 'ant-design-vue/es/notification';
import { ACCESS_TOKEN } from '@/store/mutation-types';
import { generateIndexRouter } from '@/utils/util';
import _ from 'underscore';

NProgress.configure({ showSpinner: false }); // NProgress Configuration

//免登陆白名单配置
const whiteList = [
    '/user/login',
    '/user/register',
    '/user/register-result',
    '/user/alteration',
    '/basewflow/home',
    '/basewflow/view',
    '/workflow/view',
    '/online/cgform',
    '/online/cgformList',
    '/online/cgformList/0b511f234f3847baa50106a14fff6215',
    '/online/cgformList/d11901bc44f24a66b25b37a7a04c611e',
    '/online/cgformList/dae6cc0e7a7f4b7e9dc0fc36757fdc96',
    '/online/cgformList/b0ceb7cfb2b0487a96e03f50c413d762',
    '/online/cgformList/933e21cf445440abb8cfdae366082a62',
    '/online/cgformList/9ed5bc42eb934bbe8dac16ed1a3b103f',
    '/online/cgformList/b0fee76c2ee84baeb9494b196b779e3e',
    '/online/cgformList/3da23c7955d84465a759d0f1830a0d00',
    '/online/cgformList/cfd4ee2d60fa48f585c157d524b0a108',
    '/online/cgformList/dd78c4c8a59e4ee3bd93ec011a3f6b4c',
    '/exception/403',
    '/dashboard/monitor',
]; // no redirect whitelist

//在线表单开发节点
const onlineNode = {
    redirect: null,
    path: '/online',
    component: 'layouts/RouteView',
    route: '1',
    children: [{
            path: '/online/cgform',
            component: 'modules/online/cgform/OnlCgformHeadList',
            route: '1',
            hidden: true,
            meta: { keepAlive: false, title: '表单开发' },
            name: 'online-cgform',
            id: '8d4683aacaa997ab86b966b464360338',
        },
        {
            path: '/online/cgformList/:code',
            component: 'modules/online/cgform/auto/OnlCgformAutoList',
            route: '1',
            hidden: true,
            meta: { keepAlive: false, title: '在线表单' },
            name: 'online-cgformList-@code',
            id: '54097c6a3cf50fad0793a34beff1efdf',
        },
    ],
    meta: { keepAlive: false, icon: 'cloud', title: '开发管理' },
    name: 'online',
    id: 'e41b69c57a941a3bbcce45032fe57605',
};

router.beforeEach((to, from, next) => {
    NProgress.start(); // start progress bar

    if (Vue.ls.get(ACCESS_TOKEN)) {
        /* has token */
        if (to.path === '/user/login') {
            next({ path: '/dashboard/workplace' });
            NProgress.done();
        } else {
            if (store.getters.permissionList.length === 0) {
                store
                    .dispatch('GetPermissionList')
                    .then(res => {
                        debugger;

                        //检查是否含有表单开发模块
                        let node = _.find(res.result.menu, function(item) {
                            return item.path == '/online' && item.name == 'online';
                        });

                        //如果没有在线表单开发模块，则添加此模块
                        if (node == null || node == '' || typeof node == 'undefined') {
                            res.result.menu.push(onlineNode);
                        }

                        //获取菜单数据
                        const menuData = res.result.menu;

                        console.log(res.message);
                        if (
                            menuData === null ||
                            menuData === '' ||
                            menuData === undefined
                        ) {
                            return;
                        }
                        let constRoutes = [];
                        constRoutes = generateIndexRouter(menuData);
                        // 添加主界面路由
                        store.dispatch('UpdateAppRouter', { constRoutes }).then(() => {
                            // 根据roles权限生成可访问的路由表
                            // 动态添加可访问路由表
                            router.addRoutes(store.getters.addRouters);
                            const redirect = decodeURIComponent(
                                from.query.redirect || to.path
                            );
                            if (to.path === redirect) {
                                // hack方法 确保addRoutes已完成 ,set the replace: true so the navigation will not leave a history record
                                next({...to, replace: true });
                            } else {
                                // 跳转到目的路由
                                next({ path: redirect });
                            }
                        });
                    })
                    .catch(() => {
                        /*  notification.error({
                         *  message: '系统提示',
                         *  description: '请求用户信息失败，请重试！' })
                         */
                        store.dispatch('Logout').then(() => {
                            next({ path: '/user/login', query: { redirect: to.fullPath } });
                        });
                    });
            } else {
                next();
            }
        }
    } else {
        if (
            whiteList.indexOf(to.path) !== -1 ||
            to.path.includes('/online/cgformList/')
        ) {
            // 在免登录白名单，直接进入
            next();
        } else {
            next({ path: '/user/login', query: { redirect: to.fullPath } });
            NProgress.done(); // if current page is login will not trigger afterEach hook, so manually handle it
        }
    }
});

router.afterEach(() => {
    NProgress.done(); // finish progress bar
});