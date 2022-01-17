<template>
  <div>
    <!--        <div class="card">-->
    <div class="row">

      <div class="col-lg-6 grid-margin stretch-card" style="text-align: left;">
        <div class="card">
          <div class="card-body">

            <div class="row">

              <h3 class="col-sm-12" style="margin-top:10px">Current Holdings
              </h3>

            </div>
            <div class="current-table-div">
              <b-table id="current-table"
                       sticky-column="true"
                       :per-page="pagination.perPage"
                       :current-page="pagination.currentPage"
                       striped hover
                       show-empty
                       sticky-header

                       :filter="filter"
                       :filter-included-fields="filterOn"
                       :sort-by.sync="sortBy"
                       :sort-desc.sync="sortDesc"
                       :sort-direction="sortDirection"
                       @filtered="onFiltered"
                       :fields="fields" :items="properties">

                <template #empty>
                  <div style="text-align: center"> Your account doesn't have any coin.</div>
                </template>
                <template #cell(symbol)="data">
                  <img :src="staticURL+'pics/'+data.item.symbol+'.png'" alt="image">
                  {{ data.item.symbol }}
                  <div style="color:grey;display: inline-block">({{ data.item.name }})</div>
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

                  <el-slider v-model="data.item.investPercentage" v-if="data.item.symbol!='USDT'" :show-tooltip="false"

                             :class="'slider-'+data.index%5"></el-slider>


                  <div class="progress" v-if="data.item.symbol=='USDT'">
                    <div :class="['progress-bar',progressbarStyles[data.index % 5]]" role="progressbar"
                         :style="{width: data.item.investPercentage+'%'}"></div>


                  </div>
                  <div class="invest-percentage">
                    <el-input-number v-model="data.item.investPercentage" controls-position="right"
                                     class="form-quantity occupation-quantity" :disabled="data.item.symbol=='USDT'"
                                     :min="0" :max="data.item.investPercentage + remainPercentage"
                                     :precision="0"></el-input-number>
                    <span style="margin-top: 11px">%</span></div>
                  <!--                  <div class="percentage" v-if="data.item.symbol=='USDT'"><div class="pp-r">{{ data.item.investPercentage}}</div><div class="ppp">%</div></div>-->
                </template>

              </b-table>
            </div>


          </div>
        </div>

      </div>
      <div class="col-lg-6 grid-margin stretch-card" style="text-align: left;">
        <div class="card">
          <div class="card-body">

            <div class="row">

              <h3 class="col-sm-12" style="margin-top:10px">Initial Planned Holdings
              </h3>

            </div>
            <div class="current-table-div">
              <b-table id="planned-table"
                       sticky-column="true"
                       :per-page="pagination.perPage"
                       :current-page="pagination.currentPage"
                       striped hover
                       show-empty
                       sticky-header

                       :filter="filter"
                       :filter-included-fields="filterOn"
                       :sort-by.sync="sortByWait"
                       :sort-desc.sync="sortDescWait"
                       :sort-direction="sortDirectionWait"
                       @filtered="onFiltered"
                       :fields="fieldsPlan" :items="staticProperties">

                <template #empty>
                  <div style="text-align: center"> Your account doesn't have any coin.</div>
                </template>
                <template #cell(symbol)="data">
                  <img :src="staticURL+'pics/'+data.item.symbol+'.png'" alt="image">
                  {{ data.item.symbol }}
                  <div style="color:grey;display: inline-block">({{ data.item.name }})</div>
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

                <template #cell(investPercentage)="data">
                  <div class="progress">
                    <div :class="['progress-bar',progressbarStyles[data.index % 5]]" role="progressbar"
                         :style="{width: data.item.investPercentage+'%'}"></div>
                  </div>
                  <div class="percentage">{{ data.item.investPercentage | numFilter }}%</div>
                </template>
                <!--                <template #cell(investPercentage)="data">-->

                <!--                  <el-slider v-model="data.item.investPercentage" v-if="data.item.symbol!='USDT'" :show-tooltip="false"-->

                <!--                             :class="'slider-'+data.index%5"></el-slider>-->


                <!--                  <div class="progress" v-if="data.item.symbol=='USDT'">-->
                <!--                    <div :class="['progress-bar',progressbarStyles[data.index % 5]]" role="progressbar"-->
                <!--                         :style="{width: data.item.investPercentage+'%'}"></div>-->


                <!--                  </div>-->
                <!--                  <div class="invest-percentage">-->
                <!--                    <el-input-number v-model="data.item.investPercentage" controls-position="right"-->
                <!--                                     class="form-quantity occupation-quantity" :disabled="data.item.symbol=='USDT'"-->
                <!--                                     :min="0" :max="data.item.investPercentage + remainPercentage"-->
                <!--                                     :precision="0"></el-input-number>-->
                <!--                    <span style="margin-top: 11px">%</span></div>-->
                <!--                  &lt;!&ndash;                  <div class="percentage" v-if="data.item.symbol=='USDT'"><div class="pp-r">{{ data.item.investPercentage}}</div><div class="ppp">%</div></div>&ndash;&gt;-->
                <!--                </template>-->

              </b-table>
            </div>

            <div class="invest-status-preview" v-if="account.scheme.investStatus =='normal'">

              <!--              <div class="col-md-12">-->
              <!--              <b-button variant="gradient-special"  style="visibility: hidden" @click="$bvModal.show('bv-modal-add')">Rebalance</b-button>-->


              <b-button variant="gradient-info" @click="$bvModal.show('bv-modal-invest')">Start Invest</b-button>
              <!--              </div>-->


            </div>
            <div style="text-align: center;font-family: ubuntu-regular" v-else>
              We are now processing your last invest plan, please wait until it is done.
            </div>

          </div>
        </div>

      </div>
    </div>


    <!--        </div>-->
    <b-modal centered size="xl" id="bv-modal-invest" class="bv-modal-invest" hide-footer>
      <template #modal-title>
        Invest Plan Select
      </template>
      <div class="d-block text-center">
        <h3 style="text-align: center;padding-left:1rem">You want to:</h3>
        <div class="choose-card">

          <div class="stretch-card grid-margin">
            <div class="card card-img-holder bg-info text-white">
              <div class="card-body" @click="$bvModal.show('bv-modal-submit')">
                <h3 class="font-weight-normal mb-3">Rebalance <i class="mdi mdi-history mdi-24px float-right"></i>
                </h3>
                <h4 class="mb-5">
                  Convert all your coins' percentages to the initial planned ones.
                </h4>
                <div></div>
              </div>
            </div>
          </div>
          <div class="stretch-card grid-margin">
            <div class="card badge-gradient-special text-white" @click="$router.push('../invest/invest')">
              <div class="card-body">

                <h3 class="font-weight-normal mb-3">Start New Invest <i
                    class="mdi mdi-account-cash mdi-24px float-right"></i>
                </h3>
                <h4 class="mb-5">
                  Start a new invest plan, you are free to adjust the allocation of coins and investment ratio.
                </h4>
                <div></div>
              </div>
            </div>
          </div>

        </div>
      </div>

    </b-modal>
    <b-modal centered id="bv-modal-submit">
      <template #modal-title>
        Invest Plan Submit Confirm
      </template>
      <div class="d-block text-center">
        <h4 style="text-align: left;padding-left:1rem">Do you really want to rebalance?</h4>
      </div>
      <template #modal-footer>

        <b-button size="sm" variant="dark" @click="$bvModal.hide('bv-modal-submit')">
          No
        </b-button>
        <b-button size="sm" variant="info" @click="submitInvestPlan">
          Yes
        </b-button>
      </template>
    </b-modal>
  </div>
</template>

<script>
import doughnutChart from "../../components/charts/chartjs/doughnutChart";
import {getSchemeAccountInfo} from "../../utils/schemeAccount";
import {convert_time} from "../../utils/time";
import store from "../../store";
import {compare_asc, compare_asc_letter, compare_desc, compare_desc_letter} from "../../utils/compare";


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
      staticProperties: [],
      remainPercentage: 100,//剩余的百分比
      properties: [],
      properties_backup: [],
      sortBy: '',
      sortByWait: '',
      hideSmall: [],//是否隐藏小额资产
      sortDesc: false,
      sortDirection: 'asc',
      sortDescWait: false,
      sortDirectionWait: 'asc',
      filter: null,//筛选的关键字
      filterWait: null,//筛选的关键字
      filterOn: [],//定义可以在哪些字段上过滤，不填就是全部都行
      pagination: {
        currentPage: 1,
        perPage: 100,//每页有几条数据
        rows: 3, //一共多少行
      },
      paginationWait: {
        currentPage: 1,
        perPage: 107,//每页有几条数据
        rows: 3, //一共多少行
      },
      selectedCoins: [],
      sortInfo: null,
      sortInfoBackup: null,
      progressbarStyles: ["bg-gradient-info", "bg-gradient-primary", "bg-gradient-success", "bg-gradient-danger", "bg-gradient-warning"],
      fields: [
        // A virtual column made up from two fields
        {key: 'symbol', stickyColumn: true, label: 'Coin', sortable: true, tdClass: "table-symbol"},
        // {key: 'category', label: 'Category', sortable: true},

        {key: 'amount', label: 'Current Value (USD)', sortable: true, tdClass: "table-current-value"},
        // {key: 'quantity', label: 'Current Quantity', sortable: true, tdClass: "table-current-value"},
        {key: 'percentage', label: 'Current Occupation', sortable: true, tdClass: "table-percentage"},
        // {key: 'investPercentage', label: 'Planned Occupation', sortable: true, tdClass: "table-invest-percentage"},
        // {key: 'investAmount', label: 'Estimated Value', sortable: true, tdClass: "table-invest-amount"},
        // {key: 'investQuantity', label: 'Estimated Quantity', sortable: true, tdClass: "table-invest-quantity"},

      ],
      fieldsPlan: [
        // A virtual column made up from two fields
        {key: 'symbol', stickyColumn: true, label: 'Coin', sortable: true, tdClass: "table-symbol"},
        // {key: 'category', label: 'Category', sortable: true},
        //
        // {key: 'amount', label: 'Current Value (USD)', sortable: true, tdClass: "table-current-value"},
        // {key: 'quantity', label: 'Current Quantity', sortable: true, tdClass: "table-current-value"},
        // {key: 'percentage', label: 'Current Occupation', sortable: true, tdClass: "table-percentage"},
        {key: 'investAmount', label: 'Estimated Value (USD)', sortable: true, tdClass: "table-current-value"},
        {key: 'investPercentage', label: 'Planned Occupation', sortable: true, tdClass: "table-percentage"},

        // {key: 'investQuantity', label: 'Estimated Quantity', sortable: true, tdClass: "table-invest-quantity"},

      ],
    }
  },
  methods: {
    setRemainPercentage(percentage) {
      this.remainPercentage = percentage;
    },
    sortingChanged(info) {
      this.sortInfo = info;
    },
    setSortInfoBackup() {
      this.sortInfoBackup = this.$lodash.cloneDeep(this.sortInfo);
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
        if (!(investPercentage == 0 && property.percentage == 0.1&&property.symbol!="USDT")) {
          properties.push({
            "symbol": property.symbol,
            "name": coinInfo.name,
            "quantity": property.quantity,
            "amount": property.amount,
            // "category": coinInfo.category,
            "percentage": property.percentage * 100,
            "investPercentage": investPercentage,
          });
        }
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
      for (let property of properties) {
        property.investAmount = this.account.amount * property.investPercentage / 100;
        property.investQuantity = property.investAmount / this.$store.state.coinInfo.prices[property.symbol];
      }
      this.investPlan = info.data.contents;
      properties.sort(compare_desc("amount"));
      this.properties = properties.filter(x=>x.percentage>0.01); //小额数据不显示
      // console.log(properties,this.properties,this.account.scheme.properties)
      this.staticProperties = this.$lodash.cloneDeep(properties).filter(x => x.investPercentage != 0);
      this.pagination.rows = this.properties.length;
    },
    onFiltered(filteredItems) {
      // Trigger pagination to update the number of buttons/pages due to filtering
      this.pagination.rows = filteredItems.length;
      this.pagination.currentPage = 1;
    },
    onFilteredWait(filteredItems) {
      // Trigger pagination to update the number of buttons/pages due to filtering
      this.paginationWait.rows = filteredItems.length;
      this.paginationWait.currentPage = 1;
    },
    setPropertiesBackup() {
      this.properties_backup = this.$lodash.cloneDeep(this.properties);
    },
    async submitInvestPlan() {
      let info = await this.$axios.post("newInvestPlan", {
        "plan": {},
        "rebalance": true,
        "id": this.$route.params.id,
      });
      if (info) {
        this.$router.push({name: "SchemeTrade", params: {"id": this.$route.params.id}})
      }
    },
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
.invest-status-preview {
  display: flex;
  justify-content: center; // 平分三个元素
  span {
    font-family: ubuntu-regular;
    text-align: center;
  }
}

#bv-modal-invest {
  .modal-content {
    background-color: rgb(250, 250, 250) !important;
  }
}

.choose-card {
  display: flex;
  justify-content: center;

  & > div {
    width: 20rem;
    margin: 1rem 0 2rem 2rem;
  }

  .card {
    min-height: 20rem;
    cursor: pointer;

    &:hover {
      -webkit-transform: translateY(-3px);
      -ms-transform: translateY(-3px);
      transform: translateY(-3px);
      -webkit-box-shadow: 0 0 6px #999;
      box-shadow: 0 0 6px #999;
      -webkit-transition: all .5s ease-out;
      transition: all .5s ease-out;
      cursor: pointer;
    }

    .card-body {
      //display: flex;
      //flex-flow:column;
      //justify-content: initial;
      //align-items: center;
    }
  }

  h4 {
    height: 15rem;
    //vertical-align: middle;
    //display: table-cell;
    padding-top:6rem;
    text-align: center;
    width: 240px;
  }

  h3 {
    padding-left: 1rem;

    i {
      //margin-left: 0.4rem;
    }
  }
}

//一个文件里写了样式，对所有的组件全部适用！
/*从第二个元素开始设置属性*/
@media (min-width: 768px) {
  .current-table-div {

    .b-table-sticky-header {
      min-height: 30rem;
    }

    table#current-table {
      .invest-percentage {
        display: inline-flex;
        //position:absolute;
        right: 0;
        top: 20px;
      }

      .table-invest-quantity {
        width: 190px;
        max-width: 190px;
        min-width: 190px;
      }

      .table-invest-amount {
        width: 190px;
        max-width: 190px;
        min-width: 190px;
      }

      .table-current-value {
        //width: 150px;
        //max-width: 150px;
        min-width: 120px;
      }

      .table-symbol {
        min-width: 200px;
        width: 220px;
        white-space: normal;
      }

      .table-invest-percentage {
        min-width: 200px;
        display: flex;
        justify-content: center; //水平居中
        align-items: center; //垂直居中
      }

      .table-percentage {
        text-align: left;
        //min-width: 150px;
        display: flex;
        justify-content: center;
        align-items: center; //垂直居中
        .progress {
          width: 50%;
          //display: inline-flex;
          margin-right: 10px;
        }

        .percentage {
          display: inline-block;
          font-size: 15px;
          white-space: nowrap;
          //min-width: 60px;
          width: 25%;
          text-align: right !important;
        }
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

      font-family: 'ubuntu-regular';

      thead {
        th {
          z-index: 1003;

        }

        .b-table-sticky-column {
          z-index: 1004;
        }
      }

      tbody {
        .b-table-sticky-column {
          z-index: 1002;
        }

        tr:nth-child(1) {


          .table-invest-percentage {
            justify-content: left;

            .progress {
              width: 75%;
              display: inline-flex;
              margin-right: 10px;
            }

            .invest-percentage {


            }

            .percentage {
              display: inline-flex;
              justify-content: space-between;
              font-size: 15px;
              white-space: nowrap;
              min-width: 60px;
              width: 25%;

              .pp-r {
                display: inline-block;
                width: 40px;
                text-align: center;
                margin: 0;
              }

              .ppp {
                display: inline-block;
                text-align: right;
              }

              //text-align: right !important;
            }
          }

        }

        tr:nth-of-type(odd) {

          background-color: rgb(252, 251, 253) !important;

          .b-table-sticky-column {
            //background-color: transparent;
            //background: none;
            background-image: none;
            background-color: rgb(252, 251, 253);
          }

        }

        tr:hover {
          .b-table-sticky-column {
            //background-color: transparent;
            //background: none;
            background-image: none;
            background-color: #ebedf2 !important;
          }

          background-image: none;
          background-color: #ebedf2 !important;
        }

        //.b-table-sticky-column:hover{
        //  background-image: none!important;
        //  //background-color: rgb(235, 237, 242) !important;
        //}
      }

      th {
        font-size: 15px !important;
        white-space: normal;
        vertical-align: middle;

        &:nth-of-type(n+2) {
          text-align: center !important;
        }

        &:nth-child(4), &:nth-child(5) {
          text-align: left !important;
        }
      }


      td {
        font-size: 15px !important;
        white-space: normal;
        border-top: 0px;

        img {
          margin-right: 3px;
          margin-top: -3px;
          width: 30px;
          height: 30px;
        }

        &:nth-of-type(n+2) {
          text-align: center !important;
        }

        &:nth-child(4), &:nth-child(5) {
          text-align: left !important;
        }

        div {
          font-size: 15px;
        }
      }

      .occupation-quantity {
        width: 40px;
        //margin-left: 10px;
        margin-right: 5px;

        .el-input__inner {
          height: 30px;
          padding: 0
        }

        .el-input-number__increase, .el-input-number__decrease {
          display: none !important;
        }
      }
    }

    table#planned-table {
      .invest-percentage {
        display: inline-flex;
        //position:absolute;
        right: 0;
        top: 20px;
      }

      .table-invest-quantity {
        width: 190px;
        max-width: 190px;
        min-width: 190px;
      }

      .table-invest-amount {
        width: 190px;
        max-width: 190px;
        min-width: 190px;
      }

      .table-current-value {
        //width: 150px;
        //max-width: 150px;
        min-width: 150px;
      }

      .table-symbol {
        min-width: 200px;
        width: 220px;
        white-space: normal;
      }

      .table-invest-percentage {
        min-width: 200px;
        display: flex;
        justify-content: center; //水平居中
        align-items: center; //垂直居中
      }

      .table-percentage {
        text-align: left;
        //min-width: 150px;
        display: flex;
        justify-content: center;
        align-items: center; //垂直居中
        .progress {
          width: 50%;
          //display: inline-flex;
          margin-right: 10px;
        }

        .percentage {
          //display: inline-flex;
          font-size: 15px;
          white-space: nowrap;
          //min-width: 60px;
          width: 25%;
          text-align: center !important;
        }
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

      font-family: 'ubuntu-regular';

      thead {
        th {
          z-index: 1003;

        }

        .b-table-sticky-column {
          z-index: 1004;
        }
      }

      tbody {
        .b-table-sticky-column {
          z-index: 1002;
        }

        tr:nth-child(1) {

          .table-invest-percentage {
            justify-content: left;

            .progress {
              width: 75%;
              display: inline-flex;
              margin-right: 10px;
            }

            .invest-percentage {


            }

            .percentage {
              display: inline-flex;
              justify-content: space-between;
              font-size: 15px;
              white-space: nowrap;
              min-width: 60px;
              width: 25%;

              .pp-r {
                display: inline-block;
                width: 40px;
                text-align: center;
                margin: 0;
              }

              .ppp {
                display: inline-block;
                text-align: right;
              }

              //text-align: right !important;
            }
          }

        }

        tr:nth-of-type(odd) {

          background-color: rgb(252, 251, 253) !important;

          .b-table-sticky-column {
            //background-color: transparent;
            //background: none;
            background-image: none;
            background-color: rgb(252, 251, 253);
          }

        }

        tr:hover {
          .b-table-sticky-column {
            //background-color: transparent;
            //background: none;
            background-image: none;
            background-color: #ebedf2 !important;
          }

          background-image: none;
          background-color: #ebedf2 !important;
        }

        //.b-table-sticky-column:hover{
        //  background-image: none!important;
        //  //background-color: rgb(235, 237, 242) !important;
        //}
      }

      th {
        font-size: 15px !important;
        white-space: normal;
        vertical-align: middle;

        &:nth-of-type(n+2) {
          text-align: center !important;
        }

        &:nth-child(4), &:nth-child(5) {
          text-align: left !important;
        }
      }


      td {
        font-size: 15px !important;
        white-space: normal;
        border-top: 0px;

        img {
          margin-right: 3px;
          margin-top: -3px;
          width: 30px;
          height: 30px;
        }

        &:nth-of-type(n+2) {
          text-align: center !important;
        }

        &:nth-child(4), &:nth-child(5) {
          text-align: left !important;
        }

        div {
          font-size: 15px;
        }
      }

      .occupation-quantity {
        width: 40px;
        //margin-left: 10px;
        margin-right: 5px;

        .el-input__inner {
          height: 30px;
          padding: 0
        }

        .el-input-number__increase, .el-input-number__decrease {
          display: none !important;
        }
      }
    }
  }


}

@media (max-width: 768px) {
  table#invest-wait-table {
    tbody {
      tr {
        td {
          font-size: 13px !important;
        }
      }
    }
  }
  .percentage {
    font-size: 13px !important;
  }
  .modal-dialog {
    max-width: 90%;
  }
}

</style>
