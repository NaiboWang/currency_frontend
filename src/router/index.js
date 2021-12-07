import {createRouter, createWebHistory} from 'vue-router'
import personalHome from "@/views/personalCenter/personalHome";
import personalModelList from "@/views/personalCenter/personalModelList";
import personalOrders from "@/views/personalCenter/personalOrders";
import modelEnsemble from "@/views/personalCenter/modelEnsemble";
import changePassword from "@/views/personalCenter/changePassword";
import basicInfo from "@/views/personalCenter/basicInfo";
// import managementHome from "@/views/management_center/managementHome";
import charge from "@/views/personalCenter/charge";
import modelManagement from "@/views/personalCenter/modelManagement";
import viewOrder from "@/views/personalCenter/viewOrder";
import viewWaitingList from "@/views/personalCenter/viewWaitingList";
import userList from "../views/personalCenter/userList";
import logList from "../views/personalCenter/logList";
import notifications from "@/views/personalCenter/notifications";
import redirect from "../views/redirect";
import Home from "../views/home/Home";

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
        path: '/personalHome',
        name: 'personalHome',
        component: personalHome,
        children: [
            {path: '/personalModelList', component: personalModelList},
            {path: '/manageModel/:id', component: modelManagement},
            {path: '/personalOrders', component: personalOrders},
            {path: '/soldOrders', component: personalOrders},
            {path: '/viewLogs', component: logList},
            {path: '/viewOrder/:id', component: viewOrder},
            {path: '/viewSoldOrder/:id', component: viewOrder},
            {path: '/modelEnsemble', component: modelEnsemble},
            {path: '/changePassword', component: changePassword},
            {path: '/basicInfo', component: basicInfo},
            {path: '/viewWaitingList', component: viewWaitingList},
            {path: '/charge', component: charge},
            {path: '/userManagement', component: userList},
            {path: '/notifications', component: notifications},
        ]
    },
    // {
    //     path: '/managementHome',
    //     name: 'managementHome',
    //     component: managementHome,
    //     redirect: '/managementInfo',
    //     children: [
    //         {path: '/managementModels', component: personalModelList},
    //         {path: '/managementPassword', component: changePassword},
    //         {path: '/managementInfo', component: basicInfo},
    //     ]
    // },
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

export default router
