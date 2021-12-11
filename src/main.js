import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from './plugins/axios'
import ElementUI from 'element-ui';
import locale from 'element-ui/lib/locale/lang/en'
import 'element-ui/lib/theme-chalk/index.css';
import './assets/fonts/iconfont.css'
import './assets/fonts/iconfont-user/iconfont.css'
import "./assets/css/global.css"
import waitingList from './components/waitingList.vue'
import jse from './plugins/encrypt';
import lodash from 'lodash'
import SearchBox from "@/components/SearchBox/index.js";
import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';
import BootstrapVue from 'bootstrap-vue';

//Load the root component

Vue.use(ElementUI,{locale});
Vue.use(SearchBox);
Vue.use(VueSweetalert2);
Vue.use(BootstrapVue);
Vue.prototype.$axios=axios;//配置全局属性，http接口访问包
Vue.prototype.$jse=jse;//配置全局属性，加密包
Vue.prototype.waitingList = waitingList;
Vue.prototype.$lodash = lodash; // 深度拷贝包

Vue.prototype.staticURL = process.env.VUE_APP_STATIC_URL; //配置全局静态文件地址，如图片
new Vue(
    {
        router,
        store,
        render: h => h(App),
    }
).$mount('#app');

