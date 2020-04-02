import {
    UserLayout,
    BaseLayout,
    TabLayout,
    RouteView,
    BlankLayout,
    PageView,
} from '@/components/layouts';


import qsList from '@/components/questionnaire/QS-list'
import qsData from '@/components/questionnaire/QS-data'
import qsFill from '@/components/questionnaire/QS-fill'
import qsEdit from '@/components/questionnaire/QS-edit'


/**
 * 走菜单，走权限控制
 * @type {[null,null]}
 */
export const asyncRouterMap = [{
        path: '/',
        name: 'dashboard',
        component: TabLayout,
        meta: {
            title: '首页'
        },
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
                    import ('@/views/user/Login'),
            },
            {
                path: 'register',
                name: 'register',
                component: () =>
                    import ('@/views/user/Register'),
            },
            {
                path: 'register-result',
                name: 'registerResult',
                component: () =>
                    import ('@/views/user/RegisterResult'),
            },
            {
                path: 'alteration',
                name: 'alteration',
                component: () =>
                    import ('@/views/user/Alteration'),
            },
            {
                path: 'workflow',
                name: 'workflow',
                component: () =>
                    import ('@/views/jeecg/Workflow'),
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
                    import ('@/views/jeecg/Workflow'),
            },
        ],
    },
    {
        path: '/qslist',
        name: 'QsList',
        component: qsList
    },
    {
        path: '/qsdata/:num',
        name: 'QsData',
        component: qsData
    },
    {
        path: '/qsfill/:num',
        name: 'QsFill',
        component: qsFill
    },
    {
        path: '/qsedit/:num',
        name: 'QsEdit',
        component: qsEdit
    },
    {
        path: '/404',
        component: () =>
            import ('@/views/exception/404'),
    },
];