import Vue from "vue";
import Home from './views/Home'
import store from "./store";
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import locale from 'element-ui/lib/locale/lang/en'
import axios from "./plugins/axios";
import jse from "./plugins/encrypt";
import router from "./router";
import VueSweetalert2 from "vue-sweetalert2";
import waitingList from "./components/waitingList";

Vue.use(ElementUI,{locale});

Vue.prototype.$axios=axios;//配置全局属性，http接口访问包
Vue.prototype.$jse=jse;//配置全局属性，加密包
// Vue.prototype.$store=store;//配置全局属性，加密包


Vue.prototype.staticURL = process.env.VUE_APP_STATIC_URL; //配置全局静态文件地址，如图片
new Vue(
    {
        store,
        render: h => h(Home),
    }
).$mount('#home');
