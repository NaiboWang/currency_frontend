import { createApp } from 'vue'
import Home from './views/home/Home'
import router from './router'
import store from "./store";
import ElementPlus from "element-plus";
import locale from "element-plus/lib/locale/lang/en";
import axios from "./plugins/axios";
import jse from "./plugins/encrypt";
import waitingList from "./components/waitingList";
import lodash from "lodash";
import 'element-plus/lib/theme-chalk/index.css';

//Load the root component
const app = createApp(Home);
app.use(store);
app.use(ElementPlus,{locale});
app.config.globalProperties.$axios=axios;//配置全局属性
app.config.globalProperties.$jse=jse;//配置全局属性
app.config.globalProperties.$lodash = lodash;

app.config.globalProperties.staticURL = process.env.VUE_APP_BACKEND_URL.replace("_backend",""); //配置全局静态文件地址，如图片

app.mount('#home');
