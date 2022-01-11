<template>
  <section class="main-view">
    <div class="container-scroller" v-if="loadSuccess">
      <Header/>
      <div class="container-fluid page-body-wrapper">
        <Sidebar :key="$store.state.scheme_num"/>
        <div class="main-panel">
          <div class="content-wrapper">
            <router-view :key="$route.params.id + $route.name"></router-view>
            <!--            router-view设置key为$route.params.id保证每次页面路由变化的时候组件强制刷新，因此来解决从一个方案的相同页面到另一个方案的相同页面组件不刷新的问题,同时避免了在scheme/:id/overview/:days页面每次点下面不同的日期就要重新刷新overview页面的bug;同时加了route.name以保证deposit和withdraw页面会重新刷新，因为两个页面复用了同一个组件-->
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
import axios from "axios";
import abi_pancakeRouter from "../assets/pancakeRouter";
import store from "../store";
import {convert_time} from "../utils/time";
import moment from "moment";
import {compare_asc, compare_asc_letter} from "../utils/compare";
import Web3 from "web3";
import getRate from "../utils/getRate";

export default {
  name: "layout",
  async created() { //注意生命周期，父组件的mounted是在子组件mounted之后执行的，所以这里要用created
    await this.getCoinInfo();
    await this.getIdentity();
  },
  data() {
    return {
      loadSuccess: false,
    }
  },
  components: {
    Header,
    Sidebar,
    Footer
  },
  watch: {
    $route: async function (n, o) {
      if (n.name != o.name || o.params.id != n.params.id) {
        await this.getIdentity();
      }
    }
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
        this.$message.info({message: 'Please log in', center: true});
        await this.$router.push("/login");
      }
    },
    getCoinInfo: async function () {
      let coinInfo = await this.$axios.get("getCoinInfo");
      convert_time(coinInfo);
      coinInfo.data.coins.sort(compare_asc_letter("symbol"));
      store.commit("setCoinInfo", coinInfo.data);
      //因为加载testnet的汇率的操作比较慢，又取决于用户的网络，所以上面先按照真实汇率给数据，然后等testnet的汇率出来后再按testnet汇率输出（不推荐所以这里没这样做）
      let prices = await getRate();
      for(let symbol in prices){
        coinInfo.data.prices[symbol] = prices[symbol];
      }
      console.log("coinInfo:", this.$store.state.coinInfo);
      this.loadSuccess = true; //等待汇率和coin信息加载完了再加载各种组件！

    },
    logout: async function () {
      await this.$axios.get("logout");
      await this.$router.push("/login");
    },
  }
}
</script>



