import changePassword from "@/views/personalCenter/changePassword";
import basicInfo from "@/views/personalCenter/basicInfo";

import redirect from "../views/redirect";
import Router from 'vue-router'
import Vue from "vue";
import layout from '../layout'
import dashboard from "../pages/dashboard";
import personalHome from "../views/personalCenter/personalHome";
import addScheme from "../views/personalCenter/addScheme";
import trade from "../views/personalCenter/trade";
import schemeDesc from "../views/personalCenter/schemeDesc";
import overview from "../views/personalCenter/overview";
import lineChartOverview from "../views/personalCenter/lineChartOverview";
import deposit from "../views/personalCenter/deposit";

Vue.use(Router)

const routes = [
    {
        path: '/',
        name: 'Redirect',
        component: redirect
    },
    {
        path: '/login',
        name: 'Login',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "about" */ '../views/Login.vue')
    },
    {
        path: '/register',
        name: 'Register',
        component: () => import(/* webpackChunkName: "about" */ '../views/RegisterORchangepassword.vue')
    },
    {
        path: '/forgotPassword',
        name: 'forgotPassword',
        component: () => import(/* webpackChunkName: "about" */ '../views/RegisterORchangepassword.vue')
    },
    {
        path: '/personal',
        component: layout,
        redirect: '/personalHome',
        children: [
            {path: '/personalHome', component: personalHome},
            {path: '/changePassword', component: changePassword},
            {path: '/basicInfo', component: basicInfo},
        ]
    },
    {
        path: '/scheme',
        component: layout,
        redirect: '/scheme/:id/overview',
        children: [
            {
                path: '/scheme/new',
                component: addScheme,
            },
            {
                path: '/scheme/:id/edit',
                component: schemeDesc,
            },
            {
                path: '/scheme/:id/overview',
                component: overview,
                redirect: '/scheme/:id/overview/3',
                children: [
                    {
                        path: '/scheme/:id/overview/:days',
                        component: lineChartOverview,
                    },
                ]
            },
            {
                path: '/scheme/:id/deposit',
                component: deposit, //component必须要有，下面的children才能用
                redirect: '/scheme/:id/deposit/USDT/0', //默认跳转到USDT的BEP20%BSC链,index是1,这里不能使用%20这种带空格的转义符，但是可用中文
                children: [
                    {
                        name:'depositCoinChain',
                        path: '/scheme/:id/deposit/:coin/:chain',
                        component: deposit,
                    },
                ]
            },
            {
                path: '/scheme/:id/withdraw',
                component: dashboard,
            },
            {
                path: '/scheme/:id/trade',
                component: trade,
            },
            {
                path: '/scheme/:id/invest',
                component: dashboard,
            },
        ]
    },
    {
        path: '/basic-ui',
        component: layout,
        children: [
            {
                path: '/dashboard',
                name: 'dashboard',
                component: () => import('@/pages/dashboard')
            },
            {
                path: 'buttons',
                name: 'buttons',
                component: () => import('@/pages/basic-ui/buttons')
            },
            {
                path: 'dropdowns',
                name: 'dropdowns',
                component: () => import('@/pages/basic-ui/dropdowns')
            },
            {
                path: 'typography',
                name: 'typography',
                component: () => import('@/pages/basic-ui/typography')
            }
        ]
    },
    {
        path: '/charts',
        component: layout,
        children: [
            {
                path: 'chartjs',
                name: 'chartjs',
                component: () => import('@/pages/charts/chartjs')
            },
        ]
    },
    {
        path: '/tables',
        component: layout,
        children: [
            {
                path: 'basic-tables',
                name: 'basic-tables',
                component: () => import('@/pages/tables/basic-tables')
            }
        ]
    },
    {
        path: '/auth-pages',
        component: {
            render(c) {
                return c('router-view')
            }
        },
        children: [
            {
                path: 'login',
                name: 'login',
                component: () => import('@/pages/samples/auth-pages/login')
            },
            {
                path: 'register',
                name: 'register',
                component: () => import('@/pages/samples/auth-pages/register')
            }
        ]
    },
    {
        path: '/error-pages',
        component: {
            render(c) {
                return c('router-view')
            }
        },
        children: [
            {
                path: 'error-404',
                name: 'error-404',
                component: () => import('@/pages/samples/error-pages/error-404')
            },
            {
                path: 'error-500',
                name: 'error-500',
                component: () => import('@/pages/samples/error-pages/error-500')
            }
        ]
    },
    {
        path: '/icons',
        component: layout,
        children: [
            {
                path: 'mdi-icons',
                name: 'mdi-icons',
                component: () => import('@/pages/icons/mdi-icons')
            }
        ]
    },
    {
        path: '*',
        redirect: '/error-404',
        component: {
            render(c) {
                return c('router-view')
            }
        },
        children: [
            {
                path: 'error-404',
                component: () => import('@/pages/samples/error-pages/error-404')
            }
        ]
    }
]

const router = new Router({
    mode: 'history',
    linkActiveClass: 'active',//路由跳转时动态添加样式
    routes
})

export default router
