import {
    UserLayout,
    BaseLayout,
    TabLayout,
    RouteView,
    BlankLayout,
    PageView,
} from '@/components/layouts';

/**
 * 走菜单，走权限控制
 * @type {[null,null]}
 */
export const asyncRouterMap = [{
        path: '/',
        name: 'dashboard',
        component: TabLayout,
        meta: { title: '首页' },
        redirect: '/dashboard/workplace',
        children: [
            // dashboard
        ],
    },
    {
        path: '*',
        redirect: '/404',
        hidden: true,
    },
];

/**
 * 基础路由
 * @type { *[] }
 */
export const constantRouterMap = [{
        path: '/user',
        component: UserLayout,
        redirect: '/user/login',
        hidden: true,
        children: [{
                path: 'login',
                name: 'login',
                component: () =>
                    import ( /* webpackChunkName: "user" */ '@/views/user/Login'),
            },
            {
                path: 'register',
                name: 'register',
                component: () =>
                    import ( /* webpackChunkName: "user" */ '@/views/user/Register'),
            },
            {
                path: 'register-result',
                name: 'registerResult',
                component: () =>
                    import ( /* webpackChunkName: "user" */ '@/views/user/RegisterResult'),
            },
            {
                path: 'alteration',
                name: 'alteration',
                component: () =>
                    import ( /* webpackChunkName: "user" */ '@/views/user/Alteration'),
            },
            {
                path: 'workflow',
                name: 'workflow',
                component: () =>
                    import ( /* webpackChunkName: "user" */ '@/views/jeecg/PrintLeave'),
            },
        ],
    },
    {
        path: '/basewflow',
        component: BlankLayout,
        redirect: '/basewflow/home',
        children: [{
                path: 'home',
                name: 'TestHome',
                component: () =>
                    import ('@/views/Home'),
            },
            {
                path: 'view',
                name: 'view',
                component: () =>
                    import ('@/views/jeecg/PrintLeave'),
            },
        ],
    },
    {
        path: '/404',
        component: () =>
            import ( /* webpackChunkName: "fail" */ '@/views/exception/404'),
    },
];