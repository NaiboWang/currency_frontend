<template>
  <div>
    <!-- 面包屑导航区 -->
    <div class="page-header">
      <h3 class="page-title">
      <span class="page-title-icon bg-gradient-info text-white mr-2">
        <i class="mdi mdi-wallet" style="content: '\FA9B'"></i>
      </span> Scheme > Trade  </h3>
    </div>
    <div class="row">
      <div class="col-6 grid-margin stretch-card" style="text-align: left">
        <div class="card">
          <div class="card-body">
            <h3>Scheme Information</h3>
            <form class="forms-sample" style="margin-top: 2rem">
              <div class="form-group">
                <h4>Description</h4>
                <h3 style="font-size:1.4rem">{{ schemes.name }} &nbsp; <span v-b-popover.hover.top="'Click to edit the scheme description'" class="mdi mdi-pencil edit" @click="$router.push('/scheme/'+$route.params.id+'/edit')"></span></h3>


              </div>
              <div class="form-group">
                <h4>Total Balance</h4>
                <h3>{{ amount | numFilter }} USD</h3>
              </div>
              <div class="form-group">
                <h4>Today's Profit</h4>
                <h3 :style="{color:profit >=0?(profit==0?'black':'green'):'red'}">{{ profit | numFilter }}</h3>
              </div>
            </form>
          </div>
        </div>
      </div>
      <div class="col-6 grid-margin stretch-card" style="text-align: left">
        <div class="card">
          <div class="card-body">
            <h3>Balance Allocation</h3>

          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {get_date_difference} from "../../utils/time";

export default {
  name: 'overview',
  async created() {
    await this.getSchemeAccount();
  },
  data() {
    return {
      schemes: [{}],
      amount: 0, //账户总余额
      yesterdayAmount: 0,//昨天的余额
      profit: 0,
    }
  },
  methods: {
    async getSchemeAccount() {
      let info = await this.$axios.get('getSchemeAccount', {
        params: {
          "id": this.$route.params.id,
        }
      });
      this.amount = 0;//账户总余额
      let date = new Date();
      this.yesterdayAmount = 0.0;//昨晚最后的余额是多少

      for (let property of info.data.properties) {
        property.amount = 0; //该币的总额
        for (let address of property.addresses) { //每个币有好几个链，余额统一算到该币中
          let USD = address.amount * this.$store.state.coinInfo.prices[property.symbol]
          property.amount += USD;
          this.amount += USD;
        }
      }
      info.data.propertyLogs.reverse();//从新到旧排列
      for (let propertyLog of info.data.propertyLogs) {
        if (get_date_difference(date, propertyLog["time"]["$date"]) == 1) { //找到昨天记录的最后一条资产总额记录
          this.yesterdayAmount += propertyLog["value"];
          break;
        }
      }

      this.schemes = info.data;
      if (this.amount == 0) {
        this.profit = 0; //如果账户没钱，或者已经被全部取走，则今日收益为0
      } else if (this.yesterdayAmount == 0) {
        this.profit = 0; //如果昨天账户没钱，则今日收益为0
      } else {
        // this.profit = 100 * (this.amount-this.yesterdayAmount) / this.yesterdayAmount;
        this.profit = this.amount - this.yesterdayAmount;
      }
      // console.log(this.amount, this.yesterdayAmount, this.schemes);
    },
  },
  filters: {
    numFilter(value) { //保留两位小数，每三位加逗号
      let realVal = parseFloat(value).toFixed(2);
      var str = realVal.toString();
      var reg = str.indexOf(".") > -1 ? /(\d)(?=(\d{3})+\.)/g : /(\d)(?=(?:\d{3})+$)/g;
      return str.replace(reg, "$1,");
    }
  },
  watch: {
    async $route() {
      await this.getSchemeAccount(); //路有变化时组件强制刷新，发生在从一个方案的某组件跳转到另一个方案的相同组件时
      // this.$forceUpdate();
    }
  },
}
</script>

<style scoped lang="scss">
.el-card {
  min-height: 630px;
}
h3{
  font-size:1.5rem;
}
.form-group{
  margin-top: 1.5rem;
}
.edit{
  cursor: pointer;

  &:hover{
    color: rgb(17,115,239);
  }
}
</style>
