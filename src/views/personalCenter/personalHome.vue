<template>
  <div>
    <!-- 面包屑导航区 -->
    <div class="page-header">
      <h3 class="page-title">
      <span class="page-title-icon bg-gradient-info text-white mr-2">
        <i class="mdi mdi-home"></i>
      </span> Home Page </h3>
    </div>
    <div class="row">
      <div class="col-md-4 stretch-card grid-margin">
        <div class="card bg-gradient-info card-img-holder text-white">
          <div class="card-body">
            <img src="../../assets/images/dashboard/circle.svg" class="card-img-absolute" alt="circle-image"/>
            <h3 style="margin-left: 24px" class="font-weight-normal mb-3">Total Balance <i class="mdi mdi-diamond mdi-24px float-right"></i>
            </h3>
            <h2 class="mb-5">$ {{ amount | numFilter}}</h2>
            <h5 class="card-text">Today's Profit: {{profit | numFilter}}</h5>
          </div>
        </div>
      </div>

      <div class="col-md-4 stretch-card grid-margin" v-for="(scheme,index) in schemes" :key="scheme.id">
        <div :class="scheme.classes"
             @click="$router.push('/scheme/'+scheme.id+'/overview');">
          <div class="card-body">
            <img src="../../assets/images/dashboard/circle.svg" class="card-img-absolute" alt="circle-image"/>
            <h3 style="margin-left: 24px" class="font-weight-normal mb-3">Scheme {{ scheme.code }} Balance <i
                :class="['mdi mdi-24px float-right',index%2 == 0?'mdi-chart-areaspline':'mdi-chart-line']"></i>
            </h3>
            <h2 class="mb-5">$ {{ scheme.amount | numFilter }}</h2>
            <h5 class="card-text">{{ scheme.name }}</h5>
          </div>
        </div>
      </div>

      <div class="col-md-4 stretch-card grid-margin">
        <div class="card bg-outline-success card-img-holder">
          <div class="card-body text-color">
            <h3 class="mb-3" style="margin-left: 1.5rem">New Scheme <i class="mdi mdi-clipboard-text-outline mdi-24px float-right"></i>
            </h3>
            <div >
            <h5 v-if="schemes.length!=0">You can add a new scheme to start a new invest plan!</h5>
            <h5 v-else>You don't have any invest scheme now, add a new scheme to start invest!</h5>
            </div>
            <div :class="[schemes.length%3!=2?'btn-new-scheme':'']">
            <button type="button" class="btn btn-info btn-icon-text newplan add-position"
                    @click="$router.push('scheme/new')">
              <i class="mdi mdi-plus btn-icon-prepend"></i>
              &nbsp;&nbsp;New Scheme
            </button>
            </div>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>

import {get_date_difference} from "../../utils/time";
import {getSchemeAccountInfo} from "../../utils/schemeAccount";

export default {
  async created() {
    let info = await this.$axios.get("getSchemeOverview");
    let classes = ['bg-gradient-info', 'bg-gradient-special', 'bg-gradient-primary', 'bg-gradient-special', 'bg-gradient-primary', 'bg-gradient-info', 'bg-gradient-primary', 'bg-gradient-info', 'bg-gradient-special', 'bg-gradient-info']
    let date = new Date();
    this.amount = 0;//账户总余额
    this.yesterdayAmount = 0.0;//昨晚最后的余额是多少
    for (let index in info.data.schemes) {
      info.data.schemes[index].code = String.fromCharCode(65 + parseInt(index));
      info.data.schemes[index].classes = "card card-img-holder text-white scheme_route ";
      info.data.schemes[index].classes += classes[index % 9 + 1];
      info.data.schemes[index].amount = 0; //初始化方案的总余额
      for(let property of info.data.schemes[index].properties){
        property.amount = 0; //该币的总额
        for(let address of property.addresses){ //每个币有好几个链，余额统一算到该币中
          let USD = address.amount*this.$store.state.coinInfo.prices[property.symbol]
          // console.log(property.symbol, address.amount,this.$store.state.coinInfo.prices[property.symbol],USD);
          property.amount += USD;
          info.data.schemes[index].amount += USD;
          this.amount += USD;
        }
      }
      info.data.schemes[index].propertyLogs.reverse();//从新到旧排列
      for(let propertyLog of info.data.schemes[index].propertyLogs){
        if(get_date_difference(date,propertyLog["time"]["$date"]) >= 1){ //找到昨天记录的最后一条资产总额记录
          this.yesterdayAmount = propertyLog["value"];
          if(info.data.schemes[index].amount == 0){
            this.profit += 0; //如果账户没钱，或者已经被全部取走，则今日收益为0
          } else if(propertyLog["value"] == 0){
            this.profit += 0; //如果昨天账户没钱，则今日收益为0
          } else{
            // this.profit = 100 * (this.amount-this.yesterdayAmount) / this.yesterdayAmount;
            this.profit += info.data.schemes[index].amount - propertyLog["value"];
          }
          break;
        }
      }
    }
    this.schemes = info.data.schemes;

    // let amount = 0;
    // let profit = 0;
    // for (let scheme of info.data.schemes){
    //   let account = await getSchemeAccountInfo(scheme.id); //千万不要忘了await
    //   scheme.amount = account.amount;
    //   amount +=account.amount;
    //   profit += account.profit;
    // }
    // this.amount = amount;
    // this.profit = profit;

    // console.log(this.amount, this.yesterdayAmount);
  },
  data() {
    return {
      schemes: [],
      amount:0, //账户总余额
      yesterdayAmount:0,//昨天的余额
      profit:0,
    }
  },
  computed: {},
  methods: {}
}
</script>

<style scoped lang="scss">
.text-color {
  color: rgb(50, 50, 3) !important;
  //padding-bottom:1rem;
}

.newplan {
  margin-top: 2rem;
}
.btn-new-scheme{
  position:absolute;
  margin:0 auto;
  width:100%;
  left:0;
  bottom:2rem;
}
.add-position {
  position: relative;

  i {

    &:before {
      position: absolute;
      top: 35%;
      left: 18%;
    }

  }
}

.scheme_route:hover {
  -webkit-transform: translateY(-3px);
  -ms-transform: translateY(-3px);
  transform: translateY(-3px);
  -webkit-box-shadow: 0 0 6px #999;
  box-shadow: 0 0 6px #999;
  -webkit-transition: all .5s ease-out;
  transition: all .5s ease-out;
  cursor: pointer;
}

</style>
