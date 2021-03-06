import axios from "axios";
import { Message } from "element-ui";
import router from '../router'
// import qs from 'qs';
// import store from '@/store';
// 导入NProgress, 包对应的JS和CSS
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import store from '../store'

// 创建axios实例
const service = axios.create({
    // api的base_url
    // baseURL: process.env.VUE_APP_URL, // 本地-后端解决跨域后
    baseURL: process.env.VUE_APP_BACKEND_URL,
    withCredentials: true,
    timeout: 999000 // 请求超时时间
});
// request 请求拦截器
service.interceptors.request.use(
    config => {
        if(config.url.indexOf("wait") == -1){ // 只有当请求接口地址不包含wait时才显示progress bar
            NProgress.start();
        }

        //针对django框架设计的专属post方法
        if(config.method == "post")
        {
            let param = new URLSearchParams();
            for (let key in config.data){
                param.append(key, config.data[key]);
            }
            config.data = param;
        }
        // //设置header
        // config.headers["Content-Type"] = "application/json;charset=UTF-8";
        //
        // // 格式化 get 请求
        // if (config.method === 'get' && config.data) {
        //     config.url = `${config.url}?${qs.stringify(config.data, { indices: false })}`
        //     config.headers["Content-Type"] = "application/x-www-form-urlencoded";
        //
        // }
        // // 让每个请求携带自定义token
        // if (store.getters.token) {
        //     // header添加token
        //     config.headers["Authorization"] = store.getters.token;
        // }
        return config;
    },
    error => {
        return Promise.reject(error);
    }
);
// response 响应拦截器
service.interceptors.response.use(
    response => {

        if(response.request.responseURL.indexOf("wait") == -1){
            NProgress.done();
        }
        if(typeof(response.data)=='string'){ //对返回的json字符串里有NaN导致系统崩溃的解决方案
            // console.log(0,response.data)
            response.data = response.data.replaceAll("NaN","-1");
            // console.log(1,response.data)
            response.data = JSON.parse(response.data);
            // console.log(2, response.data.data.schemes[0].propertyLogs[7],response.data)
        }
        if (response.data.status != 200 && response.data.status != 210 && 'msg' in response.data) {
            Message({
                message: response.data.msg,
                type: 'error',
                center: true
            });
            // if(response.data.status == 302){
            //     store.commit("setBackRef",window.location.pathname);
            //     router.push("/login"); //When not logged in, return to home page.
            // }
            return false;
        } else if(response.data.status == 210){
            Message({
                message: response.data.msg,
                type: 'info',
                center: true
            });
            return false;
        } else if('msg' in response.data){
            Message({
                message: response.data.msg,
                type: 'success',
                center: true
            });
        }
        return response.data;
    },
    error => {
        NProgress.done();
        if(!axios.isCancel(error)){ //如果不是取消异步请求的错误，则报错，否则不报错
            Message({
                message: "Server Error!",
                type: "error",
                duration: 5 * 1000
            });
            return Promise.reject(error);
        }else{
            return false; //取消请求返回false
        }


    }
);

export default service;
// error => {
//     if (error.response.status == 400) {
//         Message({
//             message: "参数信息有误",
//             center: true
//         });
//         return;
//     } else if (error.response.status == 302) {
//         Message({
//             message: "用户未登录",
//             center: true
//         });
//         router.push("/login");
//         setStore({ name: 'TOKEN', content: '', type: 'session' })
//         return;
//     } else if (error.response.status == 404) {
//         Message({
//             message: "连接失败",
//             center: true
//         });
//         return;
//     } else if (error.response.status == 500) {
//         Message({
//             message: "服务器内部错误",
//             center: true
//         });
//         return;
//     } else if (error.response.status == 560) {
//         Message({
//             message: "数据库异常",
//             center: true
//         });
//         return;
//     }
