<template>
  <div>
    <div class="row">
      <div class="col-lg-12 grid-margin stretch-card" style="text-align: left;">
        <div class="card">
          <div class="card-body">
            {{ remainPercentage }}
            <div class="row">

              <h3 class="col-sm-4" style="margin-top:10px">Invest Plan
                <el-popover
                    placement="right"
                    width="270"
                    trigger="hover"
                >
                  <i class="el-icon-info" slot="reference"></i>
                  The estimated invest quantity or value doesn't include the transaction fee, so the real value after
                  the invest plan submitted will be smaller than the estimated value here.

                </el-popover>
              </h3>


              <b-form-group
                  class="col-sm-8"
                  label=""
                  label-for="filter-input"
                  label-cols-sm="0"
                  label-align-sm="right"
                  style="margin-top:0"
              >
                <div class="row">

                  <div class="col-sm-6 mt-1 form-check form-check-flat form-check-info check-hide">
                    <div class="check-hide-inner">
                      <label class="form-check-label">
                        <input v-model="hideSmall" type="checkbox" class="form-check-input"> Hide Small Balance <i
                          class="input-helper"></i> </label>
                    </div>
                  </div>

                  <b-input-group class="col-sm-6 mt-1">
                    <b-input-group-prepend>
                      <span class="input-group-text"><i class="fa fa-search fa-lg"></i></span>
                    </b-input-group-prepend>
                    <b-form-input
                        id="filter-input"
                        v-model="filter"
                        type="search"
                        placeholder="Type to Search"
                    >
                    </b-form-input>

                  </b-input-group>
                </div>
              </b-form-group>

            </div>
            <b-table id="invest-table"
                     :per-page="pagination.perPage"
                     :current-page="pagination.currentPage"
                     striped hover responsive
                     show-empty
                     :filter="filter"
                     :filter-included-fields="filterOn"
                     :sort-by.sync="sortBy"
                     :sort-desc.sync="sortDesc"
                     :sort-direction="sortDirection"
                     @filtered="onFiltered"
                     :fields="fields" :items="displayProperties">
              <!--     <template #emptyfiltered>-->
              <!--       <h4>asdf</h4>-->
              <!--     </template>-->

              <template #cell(symbol)="data">
                <img :src="staticURL+'pics/'+data.item.symbol+'.png'" alt="image">
                {{ data.item.symbol }}
                <div class="percentage" style="color:grey">({{ data.item.name }})</div>
              </template>
              <template #cell(quantity)="data">
                {{ data.item.quantity | numFilter_quantity }}
              </template>
              <template #cell(investQuantity)="data">
                {{ data.item.investQuantity | numFilter_quantity }}
              </template>
              <template #cell(amount)="data">
                {{ data.item.amount | numFilter }}
              </template>
              <template #cell(investAmount)="data">
                {{ data.item.investAmount | numFilter }}
              </template>

              <template #cell(percentage)="data">
                <div class="progress">
                  <div :class="['progress-bar',progressbarStyles[data.index % 5]]" role="progressbar"
                       :style="{width: data.item.percentage+'%'}"></div>
                </div>
                <div class="percentage">{{ data.item.percentage | numFilter }}%</div>
              </template>
              <template #cell(investPercentage)="data">
                <el-slider v-model="data.item.investPercentage" :show-tooltip="false"
                           :class="'slider-'+data.index%5"></el-slider>
                <div class="invest-percentage">{{ data.item.investPercentage }}%</div>
              </template>

            </b-table>
            <b-pagination
                first-number
                last-number
                v-model="pagination.currentPage"
                :total-rows="pagination.rows"
                :per-page="pagination.perPage"
                aria-controls="my-table"
                align="center"
            ></b-pagination>

          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import doughnutChart from "../../components/charts/chartjs/doughnutChart";
import {getSchemeAccountInfo} from "../../utils/schemeAccount";
import {convert_time} from "../../utils/time";
import store from "../../store";


export default {
  async created() {
    await this.getSchemeAccount();
  },
  data() {
    return {
      account: {
        scheme: {},
        amount: 0, //账户总余额
        yesterdayAmount: 0,//昨天的余额
        profit: 0,
      },
      remainPercentage: 100,//剩余的百分比
      properties: [],
      sortBy: '',
      hideSmall: [],//是否隐藏小额资产
      sortDesc: false,
      sortDirection: 'asc',
      filter: null,//筛选的关键字
      filterOn: [],//定义可以在哪些字段上过滤，不填就是全部都行
      pagination: {
        currentPage: 1,
        perPage: 10,//每页有几条数据
        rows: 3, //一共多少行
      },
      progressbarStyles: ["bg-gradient-info", "bg-gradient-primary", "bg-gradient-success", "bg-gradient-danger", "bg-gradient-warning"],
      fields: [
        // A virtual column made up from two fields
        {key: 'symbol', label: 'Coin', sortable: true},
        // {key: 'category', label: 'Category', sortable: true},
        {key: 'quantity', label: 'Current Quantity', sortable: true},
        {key: 'amount', label: 'Current Value (USD)', sortable: true},
        {key: 'percentage', label: 'Current Occupation', sortable: true, tdClass: "table-percentage"},
        {key: 'investPercentage', label: 'Planned Occupation', sortable: true, tdClass: "table-invest-percentage"},
        {key: 'investQuantity', label: 'Estimated Quantity', sortable: true, tdClass: "table-invest-quantity"},
        {key: 'investAmount', label: 'Estimated Value (USD)', sortable: true, tdClass: "table-invest-amount"},

      ],
    }
  },
  methods: {
    setRemainPercentage(percentage) {
      this.remainPercentage = percentage;
    },
    async getSchemeAccount() {
      this.account = await getSchemeAccountInfo(this.$route.params.id);
      let info = await this.$axios.post("getInvestPlan", {"id": this.$route.params.id}); //得到投资计划
      convert_time(info.data);
      this.investPlan = info.data.contents;
      let properties = [];
      for (let property of this.account.scheme.properties) {
        let coinInfo = this.$store.state.coinInfo.coins.find(item => item.symbol == property.symbol); //根据symbol查找对应coin信息
        let investCoin = this.investPlan.find(item => item.coin == property.symbol);
        let investPercentage = 0.0; //投资计划中的该币百分比
        if (investCoin != undefined) {
          investPercentage = investCoin.percentage;
        }
        properties.push({
          "symbol": property.symbol,
          "name": coinInfo.name,
          "quantity": property.quantity,
          "amount": property.amount,
          "category": coinInfo.category,
          "percentage": property.percentage * 100,
          "investPercentage": investPercentage,
        });
      }
      for (let property of this.investPlan) { //查找投资计划中有实际上用户没有的币（实际运营中不会发生）
        if (!this.account.scheme.properties.find(item => item.symbol == property.coin)) {
          let coinInfo = this.$store.state.coinInfo.coins.find(item => item.symbol == property.coin); //根据symbol查找对应coin信息
          properties.push({
            "symbol": property.coin,
            "name": coinInfo.name,
            "quantity": 0.0,
            "amount": 0.0,
            "category": coinInfo.category,
            "percentage": 0.0,
            "investPercentage": property.percentage,
          });
        }
      }
      this.investPlan = info.data.contents;
      this.properties = properties;
      this.pagination.rows = this.properties.length;
    },
    onFiltered(filteredItems) {
      // Trigger pagination to update the number of buttons/pages due to filtering
      this.pagination.rows = filteredItems.length;
      this.pagination.currentPage = 1;
    },
  },
  computed: {
    displayProperties() {
      let remainPercentage = 100;
      for (let property of this.properties) {
        property.investAmount = this.account.amount * property.investPercentage / 100;
        property.investQuantity = property.investAmount / this.$store.state.coinInfo.prices[property.symbol];
        remainPercentage -= property.investPercentage;
      }
      console.log(this.properties);
      this.setRemainPercentage(remainPercentage); // 设置剩余的配置百分比
      if (this.hideSmall.length > 0) { //复选框选中后hideSmall数组长度由0变成1，多了一个true
        return this.properties
            .filter(f => f.percentage > 2); //小额资产定义为占比小于2%的资产
      } else {
        return this.properties;
      }
    }
  },

}
</script>

<style scoped lang="scss">
.el-card {
  min-height: 630px;
}

h3 {
  font-size: 1.5rem;
}

.form-group {
  margin-top: 1.5rem;
}

.edit {
  cursor: pointer;

  &:hover {
    color: rgb(17, 115, 239);
  }
}


//table{
//  tr{
//    color:blue;
//  }
//}
//带scoped无法修改bootstrap vue的原始样式，因为scoped可以使组件的样式不相互污染而这里我们正想修改组件的样式！
</style>
<style lang="scss">
$gradients: (
    0:linear-gradient(to right, #32a3ff, #047edf 99%),
    1:linear-gradient(to right, #da8cff, #9a55ff),
    2:linear-gradient(to right, #84d9d2, #07cdae),
    3:linear-gradient(to right, #ffbf96, #fe7096),
    4:linear-gradient(to right, #f6e384, #ffd500)
);
$non-gradients: (
    0: #198ae3,
    1: #b66dff,
    2: #1bcfb4,
    3: #fe7c96,
    4: #fed713,
);
//一个文件里写了样式，对所有的组件全部适用！
/*从第二个元素开始设置属性*/
@media screen and (min-width: 768px) {
  table#invest-table {
    font-family: 'ubuntu-regular';

    tbody {
      tr:nth-of-type(odd) {
        background-color: rgb(252, 251, 253) !important;
      }

      tr:hover {
        background-color: #ebedf2 !important;
      }
    }

    th {
      font-size: 15px !important;
      white-space: normal;

      &:nth-of-type(n+2) {
        text-align: center !important;
      }
    }

    td {
      font-size: 15px !important;
      white-space: normal;

      img {
        margin-right: 3px;
        margin-top: -3px;
        width: 30px;
        height: 30px;
      }

      &:nth-of-type(n+2) {
        text-align: center !important;
      }

      div {
        font-size: 15px;
      }
    }
  }
  @each $index,
  $value in $gradients {
    .slider-#{$index} {
      .el-slider__bar {
        background: $value;
      }
    }
  }

  @each $index,
  $value in $non-gradients {
    .slider-#{$index} {
      .el-slider__button {
        border: 2px solid $value;
      }
      width: 75%;
      display: inline-flex;
      margin-right: 15px;
    }
  }
  .invest-percentage{
    display: inline-flex;
    //position:absolute;
    right:0;
    top:20px;
  }
  .table-invest-quantity{
    width:190px;
  }
  .table-invest-amount{

  }
  .table-invest-percentage {
    min-width: 200px;
    display: flex;
    justify-content: center; //水平居中
    align-items: center; //垂直居中
  }
  .table-percentage {
    min-width: 200px;
    .progress{
      width:120px;
      display: inline-flex;
      margin-right:10px;
    }
  }

  .percentage {
    display: inline-flex;
    font-size: 15px;
    white-space: nowrap;
  }
  .custom-control-label::before {
    width: 1.2rem;
    height: 1.2rem;
  }
  .custom-control-label::after {
    width: 1.2rem;
    height: 1.2rem;
  }
  .custom-control-label {
    font-family: 'ubuntu-regular';
    line-height: 1.75 !important;
    padding-left: 2px;
    font-size: 1rem !important;
  }
  .custom-control {
    float: right;
    margin-top: 7px;
  }
}

.check-hide {
  margin-top: 0.8rem !important;

  position: relative;

  .check-hide-inner {
    position: absolute;
    right: 0.5rem;
  }

  .form-check-label {
    //float:right;
    font-family: ubuntu-regular;
    font-size: 1rem !important;

    .input-helper {

      &:before {
        width: 20px !important;
        height: 20px !important;
        margin-top: 2px;
        font-size: 1rem;
      }

      &:after {
        line-height: 20px !important;
        margin-top: 2px;
        margin-left: 1px;
      }
    }
  }
}





</style>
