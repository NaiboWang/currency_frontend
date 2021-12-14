<template>
  <div>
    <!-- 面包屑导航区 -->
    <div class="page-header">
      <h3 class="page-title">
      <span class="page-title-icon bg-gradient-info text-white mr-2">
        <i class="mdi mdi-chart-areaspline" style="content: '\FA9B'"></i>
      </span> Scheme > Overview </h3>
    </div>
    <div class="row">
      <div class="col-lg-12 grid-margin stretch-card" style="text-align: left">
        <div class="card">
          <div class="card-body">
            <h4>Total Balance</h4>
            <h3 v-if="account.amount!=-1">{{ account.amount| numFilter }} USD</h3>
            <h4 :style="{color:account.profit==0?'black':(account.profit>0?'green':'orangered')}"> Today's Profit :
              {{ account.profit| numFilter }} ({{ account.profitPercentage | numFilter }}%)</h4>
            <div><br>
            </div>
            <div v-if="account.amount!=-1 && account.propertyLogLength>0">
              <router-view :key="$route.params.days"></router-view>
              <div class="row">
                <div class="col-md-8">
                  <router-link to="1" class="btn btn-outline-info btn-rounded btn-time">24 hours</router-link>
                  <router-link to="3" v-if="dateDifference>=1" class="btn btn-outline-info btn-rounded btn-time">3
                    days
                  </router-link>
                  <router-link to="7" v-if="dateDifference>=3" class="btn btn-outline-info btn-rounded btn-time">7
                    days
                  </router-link>
                  <router-link to="30" v-if="dateDifference>=7" class="btn btn-outline-info btn-rounded btn-time">1
                    month
                  </router-link>
                  <router-link to="90" v-if="dateDifference>=27" class="btn btn-outline-info btn-rounded btn-time">3
                    months
                  </router-link>
                  <router-link to="180" v-if="dateDifference>=90" class="btn btn-outline-info btn-rounded btn-time">6
                    months
                  </router-link>
                  <router-link to="365" v-if="dateDifference>=180" class="btn btn-outline-info btn-rounded btn-time">1
                    year
                  </router-link>
                  <router-link to="730" v-if="dateDifference>=365" class="btn btn-outline-info btn-rounded btn-time">2
                    years
                  </router-link>
                  <router-link to="1095" v-if="dateDifference>=730" class="btn btn-outline-info btn-rounded btn-time">3
                    years
                  </router-link>
                </div>
                <div class="col-md-4 profits"
                     :style="{color:rangeProfit==0?'black':(rangeProfit>0?'green':'orangered')}">{{ pastProfit }}
                </div>
              </div>
            </div>
            <div v-else style="text-align: center;display: table;width: 100%;height:20rem"><h5
                style="display:table-cell;vertical-align:middle;text-align: center">You don't have any property logs
              now.</h5></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
//测试大量log数据看是什么效果
import * as echarts from 'echarts';
import {getSchemeAccountInfo} from "../../utils/schemeAccount";
import {convert_time, get_date_difference} from "../../utils/time";

export default {
  async mounted() {
    this.account = await getSchemeAccountInfo(this.$route.params.id); //得到用户总数据
    this.$store.commit("setAmount", this.account.amount);
    this.dateDifference = get_date_difference(new Date(), this.account.scheme.propertyStartTime["$date"]);
  },
  components: {},
  data() {
    return {
      account: {
        profit: 0,
        profitPercentage: 0,
        propertyLogLength: 0,
        amount: -1, //默认-1以保证加载的条形图的最后一项“现在的余额”是后台加载出来的
      },
      rangeProfit: 0,
      dateDifference: 0,
    }
  },
  methods: {
    setRangeProfit(amount) {
      this.rangeProfit = parseFloat(amount);
    }
  },
  computed: {
    pastProfit() {
      this.setRangeProfit(this.account.amount - this.$store.state.startAmount); //不允许写data的值，只允许读
      let profit = this.$numFilter(this.rangeProfit);
      let percentage = this.$numFilter(100 * (this.account.amount - this.$store.state.startAmount) / this.$store.state.startAmount)
      // console.log(this.account.amount, this.$store.state.startAmount,this.rangeProfit);
      let range = "";
      let days = this.$route.params.days;
      if (days == 1) {
        range = "24 hours";
      } else if (days < 20) {
        range = days + " days";
      } else if (days == 30) {
        range = "1 month";
      } else if (days < 360) {
        range = days / 30 + " months";
      } else if (days == 365) {
        range = "1 year";
      } else {
        range = days / 365 + " years";
      }
      return range + " balance change: " + profit + " (" + percentage + "%)";
    },
  },
}
</script>
<style lang="scss">
.btn-time {
  color: #2b4b6b!important;
  font-weight: normal;
  border: 1px solid transparent!important;
  width: 7em!important;
  font-family: ubuntu-regular!important;
  padding: 0.5em 1em!important;
  //margin-right: 1px;
  background-color: transparent!important;


  &:hover {
    color: #047edf!important;
    background: transparent!important;
  }

  &:not(:disabled):not(.disabled).active:focus {
    box-shadow: 0 0 0 0 !important;
  }
  &.active { //表示同时具有active类和btn-time类的标签的样式
    color: #fff!important;
    background-color: #198ae3!important;
    border-color: #198ae3!important;
  }
  //&.active { //同时具有btn-time和active类时触发
  //  color: #047edf;
  //  border: 1px solid #2b4b6b;
  //  border-radius: 2px;
  //}
}
.profits {
  text-align: right;
  font-family: ubuntu-regular;
  padding-right: 3rem;
  margin: auto 0;
}
</style>
