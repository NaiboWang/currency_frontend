import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from './plugins/axios'
import ElementPlus from 'element-plus';
import locale from 'element-plus/lib/locale/lang/en'
import 'element-plus/lib/theme-chalk/index.css';
import './assets/fonts/iconfont.css'
import './assets/fonts/iconfont-user/iconfont.css'
import "./assets/css/global.css"
import waitingList from './components/waitingList.vue'
import jse from './plugins/encrypt';
import lodash from 'lodash'
import SearchBox from "@/components/SearchBox/index.js";
import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue-3/dist/bootstrap-vue-3.css'

//Load the root component
const app = createApp(App);
app.use(store).use(router);
app.use(ElementPlus,{locale});
app.use(SearchBox);
app.use(VueSweetalert2);
app.config.globalProperties.$axios=axios;//配置全局属性，http接口访问包
app.config.globalProperties.$jse=jse;//配置全局属性，加密包
app.config.globalProperties.waitingList = waitingList;
app.config.globalProperties.$lodash = lodash; // 深度拷贝包

app.config.globalProperties.staticURL = process.env.VUE_APP_BACKEND_URL.replace("_backend",""); //配置全局静态文件地址，如图片
app.mount('#app');

