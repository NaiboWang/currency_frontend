<template>
  <section class="main-view">
    <div class="container-scroller" v-if="loadSuccess">
      <Header/>
      <div class="container-fluid page-body-wrapper">
        <Sidebar :key="$store.state.scheme_num"/>
        <div class="main-panel">
          <div class="content-wrapper">
            <router-view :key="$route.params.id"></router-view>
<!--            router-view设置key为$route.params.id保证每次页面路由变化的时候组件强制刷新，因此来解决从一个方案的相同页面到另一个方案的相同页面组件不刷新的问题,同时避免了在scheme/:id/overview/:days页面每次点下面不同的日期就要重新刷新overview页面的bug-->
          </div> <!-- content wrapper ends -->
          <Footer/>
        </div> <!-- main panel ends -->
      </div> <!-- page-body-wrapper ends -->
    </div>
  </section>
</template>

<script>
  import Header from "./partials/Header";
  import Sidebar from "./partials/Sidebar";
  import Footer from "./partials/Footer";
  import getIdentity from "../store/userInfo";
  import axios from "../plugins/axios";
  import store from "../store";
  import {convert_time} from "../utils/time";
  import moment from "moment";
  export default {
    name: "layout",
    async created() { //注意生命周期，父组件的mounted是在子组件mounted之后执行的，所以这里要用created
      await this.getCoinInfo();
      await this.getIdentity();
    },
    data(){
      return {
        loadSuccess:false,
      }
    },
    components: {
      Header,
      Sidebar,
      Footer
    },
    methods: {
      toggleSidebar: () => {
        document.querySelector('body').classList.toggle('sidebar-icon-only');
      },
      toggleMobileSidebar: () => {
        document.querySelector('#sidebar').classList.toggle('active');
      },
      getIdentity: async function () {
        let userInfo = await getIdentity();
        if (userInfo.role == "guest") {
          this.$message.error('Sorry, you have not logged in or you are not authorised user!');
          await this.$router.push("/login");
        }
      },
      getCoinInfo: async function () {
        let getCoinInfo = await axios.get("getCoinInfo");
        convert_time(getCoinInfo);
        store.commit("setCoinInfo",getCoinInfo.data);
        // console.log(this.$store.state.coinInfo);
        this.loadSuccess = true; //等待汇率和coin信息加载完了再加载各种组件！
      },
      logout: async function () {
        await this.$axios.get("logout");
        await this.$router.push("/login");
      },
    }
  }
</script>



