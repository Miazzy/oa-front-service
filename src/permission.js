//import Vue from 'vue';
import router from './router';
import store from './store';
//import NProgress from 'nprogress'; // progress bar
//import 'nprogress/nprogress.css'; // progress bar style
//import notification from 'ant-design-vue/es/notification';
import {
    ACCESS_TOKEN
} from '@/store/mutation-types';
import {
    generateIndexRouter
} from '@/utils/util';

NProgress.configure({
    showSpinner: false
}); // NProgress Configuration

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
    '/exception/403',
    '/dashboard/monitor',
]; // no redirect whitelist

const homeNode = {
    redirect: null,
    path: '/dashboard/analysis',
    component: 'dashboard/Analysis',
    route: '1',
    meta: {
        keepAlive: false,
        icon: 'home',
        title: '首页'
    },
    name: 'dashboard-analysis',
    id: '9502685863ab87f0ad1134142788a385',
};

//在线表单开发节点
const onlineNode = {
    redirect: null,
    path: '/online',
    component: 'layouts/RouteView',
    hidden: true,
    route: '1',
    children: [{
            path: '/online/cgform',
            component: 'modules/online/cgform/OnlCgformHeadList',
            route: '1',
            hidden: true,
            meta: {
                keepAlive: false,
                title: '表单开发'
            },
            name: 'online-cgform',
            id: '8d4683aacaa997ab86b966b464360338',
        },
        {
            path: '/online/cgformList/:code',
            component: 'modules/online/cgform/auto/OnlCgformAutoList',
            route: '1',
            hidden: true,
            meta: {
                keepAlive: false,
                title: '在线表单'
            },
            name: 'online-cgformList-@code',
            id: '54097c6a3cf50fad0793a34beff1efdf',
        },
    ],
    meta: {
        keepAlive: false,
        icon: 'cloud',
        title: '开发管理'
    },
    name: 'online',
    id: 'e41b69c57a941a3bbcce45032fe57605',
};

//个人管理节点
var accountNode = {
    redirect: null,
    path: '/account',
    component: 'layouts/RouteView',
    route: '1',
    children: [{
            path: '/',
            component: '',
            route: '1',
            meta: {
                keepAlive: false,
                title: '我的收藏'
            },
            name: '',
            id: '1f5f9447dc66b864c8f71a0ce7753cef',
        },
        {
            path: '/account/center',
            component: 'account/center/Index',
            route: '1',
            meta: {
                keepAlive: false,
                title: '个人中心'
            },
            name: 'account-center',
            id: 'd86f58e7ab516d3bc6bfb1fe10585f97',
        },
        {
            path: '/account/settings/base',
            component: 'account/settings/Index',
            route: '1',
            children: [{
                    path: '/account/settings/base',
                    component: 'account/settings/BaseSetting',
                    route: '1',
                    hidden: true,
                    meta: {
                        keepAlive: false,
                        title: '基本设置'
                    },
                    name: 'account-settings-base',
                    id: '1367a93f2c410b169faa7abcbad2f77c',
                },
                {
                    path: '/account/settings/binding',
                    component: 'account/settings/Binding',
                    route: '1',
                    meta: {
                        keepAlive: false,
                        title: '账户绑定'
                    },
                    name: 'account-settings-binding',
                    id: '4f66409ef3bbd69c1d80469d6e2a885e',
                },
                {
                    path: '/account/settings/custom',
                    component: 'account/settings/Custom',
                    route: '1',
                    meta: {
                        keepAlive: false,
                        title: '个性化设置'
                    },
                    name: 'account-settings-custom',
                    id: '882a73768cfd7f78f3a37584f7299656',
                },
                {
                    path: '/account/settings/security',
                    component: 'account/settings/Security',
                    route: '1',
                    meta: {
                        keepAlive: false,
                        title: '安全设置'
                    },
                    name: 'account-settings-security',
                    id: 'ec8d607d0156e198b11853760319c646',
                },
                {
                    path: '/account/settings/notification',
                    component: 'account/settings/Notification',
                    route: '1',
                    meta: {
                        keepAlive: false,
                        title: '新消息通知'
                    },
                    name: 'account-settings-notification',
                    id: 'fedfbf4420536cacc0218557d263dfea',
                },
            ],
            meta: {
                keepAlive: false,
                title: '个人设置'
            },
            name: 'account-settings-base',
            id: '6e73eb3c26099c191bf03852ee1310a1',
            alwaysShow: true,
        },
        {
            path: '/dashboard/workplace',
            component: 'dashboard/Workplace',
            route: '1',
            meta: {
                keepAlive: false,
                title: '工作台'
            },
            name: 'dashboard-workplace',
            id: '8fb8172747a78756c11916216b8b8066',
        },
    ],
    meta: {
        keepAlive: false,
        icon: 'user',
        title: '个人管理'
    },
    name: 'account',
    id: '717f6bee46f44a3897eca9abd6e2ec44',
};

//审批节点管理
var workFlowNode = {
    redirect: null,
    path: '/approval',
    component: 'layouts/RouteView',
    route: '1',
    children: [{
            path: '/online/cgformList/0b511f234f3847baa50106a14fff6215',
            component: 'modules/online/cgform/auto/OnlCgformApprList',
            route: '0',
            meta: {
                keepAlive: false,
                title: '审批处理'
            },
            name: 'online-cgformList-0b511f234f3847baa50106a14fff6215',
            id: '7101b2508c7c325efd027779a78b0cca',
        },
        {
            path: '/online/cgformList/d11901bc44f24a66b25b37a7a04c611e',
            component: 'modules/online/cgform/auto/OnlCgformApprList',
            route: '0',
            meta: {
                keepAlive: false,
                title: '知会确认'
            },
            name: 'online-cgformList-d11901bc44f24a66b25b37a7a04c611e',
            id: '81998caf9684374fe3355053d0985b43',
        },
        {
            path: '/online/cgformList/dae6cc0e7a7f4b7e9dc0fc36757fdc96',
            component: 'modules/online/cgform/auto/OnlCgformAutoList',
            route: '0',
            meta: {
                keepAlive: false,
                title: '历史日志'
            },
            name: 'online-cgformList-dae6cc0e7a7f4b7e9dc0fc36757fdc96',
            id: '6172e3805981c4741bcc7979606fd2a1',
        },
        {
            path: '/workflow/view',
            component: 'jeecg/Workflow',
            route: '1',
            hidden: true,
            meta: {
                keepAlive: false,
                title: '流程详情'
            },
            name: 'workflow-view',
            id: '423b32588d8a1a41a041ca41828c3335',
        },
    ],
    meta: {
        keepAlive: false,
        icon: 'thunderbolt',
        title: '审批管理'
    },
    name: 'approval',
    id: 'f5cebd5e62765834f9c1e2fb9db02b9e',
};

//行政管理节点
var adminNode = {
    redirect: null,
    path: '/administration',
    component: 'layouts/RouteView',
    route: '1',
    children: [{
            path: '/administration/attendance',
            component: 'layouts/RouteView',
            route: '1',
            children: [{
                    path: '/online/cgformList/b0ceb7cfb2b0487a96e03f50c413d762',
                    component: 'modules/online/cgform/auto/OnlCgformAutoList',
                    route: '0',
                    meta: {
                        keepAlive: false,
                        title: '请假'
                    },
                    name: 'online-cgformList-b0ceb7cfb2b0487a96e03f50c413d762',
                    id: 'b221d9a06d3f721a7b3db28d401dfd10',
                },
                {
                    path: '/online/cgformList/933e21cf445440abb8cfdae366082a62',
                    component: 'modules/online/cgform/auto/OnlCgformAutoList',
                    route: '0',
                    meta: {
                        keepAlive: false,
                        title: '外出'
                    },
                    name: 'online-cgformList-933e21cf445440abb8cfdae366082a62',
                    id: '0c1397dcd8e1f0a2e7ad562bf6a96ab4',
                },
                {
                    path: '/online/cgformList/9ed5bc42eb934bbe8dac16ed1a3b103f',
                    component: 'modules/online/cgform/auto/OnlCgformAutoList',
                    route: '0',
                    meta: {
                        keepAlive: false,
                        title: '加班'
                    },
                    name: 'online-cgformList-9ed5bc42eb934bbe8dac16ed1a3b103f',
                    id: '83a8283bed3cc696d13ad5d905508331',
                },
                {
                    path: '/online/cgformList/b0fee76c2ee84baeb9494b196b779e3e',
                    component: 'modules/online/cgform/auto/OnlCgformAutoList',
                    route: '0',
                    meta: {
                        keepAlive: false,
                        title: '考勤异常'
                    },
                    name: 'online-cgformList-b0fee76c2ee84baeb9494b196b779e3e',
                    id: 'e805373f43bd0ce4308248283770e0c8',
                },
            ],
            meta: {
                keepAlive: false,
                title: '考勤管理'
            },
            name: 'administration-attendance',
            id: '4fc7ede3cc0c510b0658f5afa074b651',
        },
        {
            path: '/administration/file',
            component: 'layouts/RouteView',
            route: '1',
            children: [{
                path: '/online/cgformList/3da23c7955d84465a759d0f1830a0d00',
                component: 'modules/online/cgform/auto/OnlCgformAutoList',
                route: '0',
                meta: {
                    keepAlive: false,
                    title: '档案及证照借阅'
                },
                name: 'online-cgformList-3da23c7955d84465a759d0f1830a0d00',
                id: 'c7c17a470bfd9b63cda614ad7d816cef',
            }, ],
            meta: {
                keepAlive: false,
                title: '档案管理'
            },
            name: 'administration-file',
            id: 'fc6d2c71ca64e30d55c10a58e7834dd7',
        },
        {
            path: '/administration/seal',
            component: 'layouts/RouteView',
            route: '1',
            children: [{
                    path: '/online/cgformList/cfd4ee2d60fa48f585c157d524b0a108',
                    component: 'modules/online/cgform/auto/OnlCgformAutoList',
                    route: '0',
                    meta: {
                        keepAlive: false,
                        title: '用印申请(非合同)'
                    },
                    name: 'online-cgformList-cfd4ee2d60fa48f585c157d524b0a108',
                    id: '21b0140b1af6f81205db5de9a79b1673',
                },
                {
                    path: '/online/cgformList/dd78c4c8a59e4ee3bd93ec011a3f6b4c',
                    component: 'modules/online/cgform/auto/OnlCgformAutoList',
                    route: '0',
                    meta: {
                        keepAlive: false,
                        title: '用印申请(合同)'
                    },
                    name: 'online-cgformList-dd78c4c8a59e4ee3bd93ec011a3f6b4c',
                    id: '9c7d89e7cf4079ab199d176857d855ab',
                },
                {
                    path: '/online/cgformList/e412b58db17b4cbf8cb9833c118c2d3b',
                    component: 'modules/online/cgform/auto/OnlCgformAutoList',
                    route: '0',
                    meta: {
                        keepAlive: false,
                        title: '印章借用申请',
                    },
                    name: 'online-cgformList-e412b58db17b4cbf8cb9833c118c2d3b',
                    id: 'af1c707f9101f1777d6a407434250695',
                },
            ],
            meta: {
                keepAlive: false,
                title: '印章管理'
            },
            name: 'administration-seal',
            id: 'd40412e448b5b75be73e9e15985676f6',
        },
        {
            path: '/administration/travel',
            component: 'layouts/RouteView',
            route: '1',
            children: [{
                path: '/online/cgformList/62f7122c73c244119e5d4ec8aa170a3d',
                component: 'modules/online/cgform/auto/OnlCgformAutoList',
                route: '0',
                meta: {
                    keepAlive: false,
                    title: '出差申请',
                },
                name: 'online-cgformList-62f7122c73c244119e5d4ec8aa170a3d',
                id: 'ea400444e39136516edd01104540dae8',
            }, ],
            meta: {
                keepAlive: false,
                title: '差旅管理',
            },
            name: 'administration-travel',
            id: '58f36d0c9938862083278bdee5448cad',
        },
    ],
    meta: {
        keepAlive: false,
        icon: 'team',
        title: '行政管理'
    },
    name: 'administration',
    id: '29bf8e546cdaacc7c21f8f4367bd1c52',
};

//系统管理节点
var isystemNode = {
    redirect: null,
    path: '/isystem',
    component: 'layouts/RouteView',
    route: '1',
    children: [{
            path: '/isps/userAnnouncement',
            component: 'system/UserAnnouncementList',
            route: '1',
            meta: {
                keepAlive: false,
                title: '我的消息'
            },
            name: 'isps-userAnnouncement',
            id: '53a9230444d33de28aa11cc108fb1dba',
        },
        {
            path: '/isystem/annountCement',
            component: 'system/SysAnnouncementList',
            route: '1',
            meta: {
                keepAlive: false,
                title: '系统通告'
            },
            name: 'isystem-annountCement',
            id: 'e08cb190ef230d5d4f03824198773950',
        },
    ],
    meta: {
        keepAlive: false,
        icon: 'setting',
        title: '系统管理'
    },
    name: 'isystem',
    id: 'd7d6e2e4e2934f2c9385a623fd98c6f3',
};

//查看审批详情叶子节点
const viewSubNode =
    '{"path":"/workflow/view","component":"jeecg/Workflow","route":"1","hidden":true,"meta":{"keepAlive":false,"title":"流程详情"},"name":"workflow-view","id":"423b32588d8a1a41a041ca41828c3335"}';

router.beforeEach((to, from, next) => {

    // start progress bar
    NProgress.start();

    try {
        if (Vue.ls.get(ACCESS_TOKEN)) {
            /* has token */
            if (to.path === '/user/login') {
                next({
                    path: '/dashboard/workplace'
                });
                NProgress.done();
            } else {
                if (store.getters.permissionList.length === 0) {
                    store
                        .dispatch('GetPermissionList')
                        .then(res => {
                            //检查是否含有表单开发模块
                            let onlineFlag = false;
                            let accountFlag = false;
                            let workFlowFlag = false;
                            let isystemFlag = false;
                            let homeFlag = false;
                            let adminFlag = false;
                            res.result.menu.forEach(function(item) {
                                if (item.path == '/online' && item.name == 'online') {
                                    onlineFlag = true;
                                }
                                if (item.path == '/account' && item.name == 'account') {
                                    accountFlag = true;
                                }
                                if (item.path == '/approval' && item.name == 'approval') {
                                    workFlowFlag = true;
                                    item.children.push(JSON.parse(viewSubNode));
                                }
                                if (item.path == '/isystem' && item.name == 'isystem') {
                                    isystemFlag = true;
                                }
                                if (item.path == '/dashboard/analysis') {
                                    homeFlag = true;
                                }
                                if (item.path == '/administration') {
                                    adminFlag = true;
                                }
                            });

                            //如果首页模块，则添加此模块
                            if (!homeFlag) {
                                res.result.menu.push(homeNode);
                            }
                            //如果没有个人管理模块，则添加此模块
                            if (!accountFlag) {
                                res.result.menu.push(accountNode);
                            }
                            //如果没有审批管理模块，则添加此模块
                            if (!workFlowFlag) {
                                res.result.menu.push(workFlowNode);
                            }
                            //如果没有行政管理模块，则添加此模块
                            if (!adminFlag) {
                                res.result.menu.push(adminNode);
                            }
                            //如果没有系统管理模块，则添加此模块
                            if (!isystemFlag) {
                                res.result.menu.push(isystemNode);
                            }
                            //如果没有在线表单开发模块，则添加此模块
                            if (!onlineFlag) {
                                res.result.menu.push(onlineNode);
                            }

                            //获取菜单数据
                            const menuData = res.result.menu;

                            console.log(res.result.menu);
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
                            store.dispatch('UpdateAppRouter', {
                                constRoutes
                            }).then(() => {
                                // 根据roles权限生成可访问的路由表
                                // 动态添加可访问路由表
                                router.addRoutes(store.getters.addRouters);
                                const redirect = decodeURIComponent(
                                    from.query.redirect || to.path
                                );
                                if (to.path === redirect) {
                                    // hack方法 确保addRoutes已完成 ,set the replace: true so the navigation will not leave a history record
                                    next({
                                        ...to,
                                        replace: true
                                    });
                                } else {
                                    // 跳转到目的路由
                                    next({
                                        path: redirect
                                    });
                                }
                            });
                        })
                        .catch(() => {
                            store.dispatch('Logout').then(() => {
                                next({
                                    path: '/user/login',
                                    query: {
                                        redirect: to.fullPath
                                    }
                                });
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
                next({
                    path: '/user/login',
                    query: {
                        redirect: to.fullPath
                    }
                });
                NProgress.done(); // if current page is login will not trigger afterEach hook, so manually handle it
            }
        }
    } catch (error) {
        console.log(error);
    }

});

router.afterEach(() => {
    NProgress.done(); // finish progress bar
});