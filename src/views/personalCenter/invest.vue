<template>
  <div>

    <div class="row">
      <div class="col-lg-12 grid-margin stretch-card" style="text-align: left;">
        <div class="card">
          <div class="card-body">

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

                  <div class="col-sm-6 form-check form-check-flat form-check-info check-hide">
<!--                    <div class="check-hide-inner">-->
<!--                      <label class="form-check-label">-->
<!--                        <input v-model="hideSmall" type="checkbox" class="form-check-input"> Hide Small Balance <i-->
<!--                          class="input-helper"></i> </label>-->
<!--                    </div>-->
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
            <div class="invest-table-div">
              <b-table id="invest-table"
                       sticky-column="true"
                       :per-page="pagination.perPage"
                       :current-page="pagination.currentPage"
                       striped hover
                       show-empty
                       sticky-header
                       @sort-changed="sortingChanged"
                       no-local-sorting
                       :filter="filter"
                       :filter-included-fields="filterOn"
                       :sort-by.sync="sortBy"
                       :sort-desc.sync="sortDesc"
                       :sort-direction="sortDirection"
                       @filtered="onFiltered"
                       :fields="fields" :items="displayProperties">

                <template #empty>
                  <div style="text-align: center"> Please add your first coin to start invest.</div>
                </template>
                <template #cell(symbol)="data">
                  <div style="color:grey;margin-right:1rem;display: inline-block">

                  <span
                      v-if="data.item.symbol != 'USDT'"
                      v-b-popover.hover.top="'Remove this coin'" class="mdi mdi-minus-circle edit"
                      style="margin-left:0.5rem;font-size: 1.1rem;"
                      @click="removeCoin(data.item.symbol)"></span>
<!--                    <span v-else-->
<!--                          v-b-popover.hover.top="'You cannot remove USDT'" class="mdi mdi-info edit"-->
<!--                          style="margin-left:0.5rem;font-size: 1.1rem;visibility: hidden"-->
<!--                          @click="removeCoin(data.item.symbol)"></span>-->
                    <span v-else v-b-popover.hover.top="'You can reduce other coin\'s percentage to get USDT'" class="el-icon-info edit" style="margin-left:0.5rem;font-size: 1.1rem;cursor:initial;"></span>
                  </div>
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

            <div class="invest-status" v-if="account.scheme.investStatus =='normal'">

              <!--              <div class="col-md-12">-->
              <b-button variant="gradient-special" @click="$bvModal.show('bv-modal-add')">Add new coin</b-button>

              <!--              <span style="margin-top: 3px">Remain Invest Percentage: {{-->
              <!--                  remainPercentage > 0 ? remainPercentage : 0 | numFilter-->
<!--                              }}%  -->
              <!--                              <br> Estimated Remain Value: {{-->
              <!--                  remainPercentage > 0 ? remainPercentage * account.amount : 0 | numFilter-->
              <!--                }} USD-->
              <!--                            </span>-->

              <b-button variant="gradient-info" @click="$bvModal.show('bv-modal-submit')">Submit Plan</b-button>
              <!--              </div>-->


            </div>
            <div style="text-align: center;font-family: ubuntu-regular" v-else>
              We are now processing your last invest plan, please wait until it is done.
            </div>
            <!--            <b-pagination-->
            <!--                first-number-->
            <!--                last-number-->
            <!--                v-model="pagination.currentPage"-->
            <!--                :total-rows="pagination.rows"-->
            <!--                :per-page="pagination.perPage"-->
            <!--                aria-controls="my-table"-->
            <!--                align="center"-->
            <!--            ></b-pagination>-->
          </div>
        </div>
      </div>
    </div>
    <b-modal centered id="bv-modal-submit">
      <template #modal-title>
        Invest Plan Submit Confirm
      </template>
      <div class="d-block text-center">
        <h4 style="text-align: left;padding-left:1rem">Do you really want to submit this invest plan?</h4>
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
    <b-modal centered size="xl" id="bv-modal-add">
      <template #modal-title>
        Add New Coin
      </template>
      <div class="d-block text-center">


        <b-form-group
            class="col-sm-12"
            label=""
            label-for="filter-input"
            label-cols-sm="0"
            label-align-sm="right"
            style="margin-top:0"
        >
          <div class="row">

            <b-input-group class="mt-1">
              <b-input-group-prepend>
                <span class="input-group-text"><i class="fa fa-search fa-lg"></i></span>
              </b-input-group-prepend>
              <b-form-input
                  id="filter-input"
                  v-model="filterWait"
                  type="search"
                  placeholder="Type to Search"
              >
              </b-form-input>

            </b-input-group>
          </div>
        </b-form-group>
        <div class="invest-table-wait-div">

          <b-table id="invest-wait-table"
                   sticky-column="true"
                   :per-page="paginationWait.perPage"
                   :current-page="paginationWait.currentPage"
                   striped hover
                   show-empty
                   sticky-header
                   :filter="filterWait"
                   :filter-included-fields="filterOn"
                   :sort-by.sync="sortByWait"
                   :sort-desc.sync="sortDescWait"
                   :sort-direction="sortDirectionWait"
                   @filtered="onFilteredWait"
                   :fields="fieldsWait" :items="waitCoins">
            <!--               <template #emptyfiltered>-->
            <!--                 <h4>asdf</h4>-->
            <!--               </template>-->
            <template #cell(index)="data">

              <div class="form-check form-check-flat form-check-info check-coin">
                <div class="check-hide-inner">
                  <label class="form-check-label">
                    <input :value="data.item.symbol" v-model="selectedCoins" type="checkbox" class="form-check-input">
                    <i
                        class="input-helper"></i> </label>
                </div>
              </div>
            </template>

            <template #cell(symbol)="data">
              <img :src="staticURL+'pics/'+data.item.symbol+'.png'" alt="image">
              {{ data.item.symbol }}
              <div class="percentage" style="color:grey">({{ data.item.name }})</div>
            </template>

            <template #cell(price)="data">
              {{ data.item.price | numFilter }}
            </template>

          </b-table>
        </div>
      </div>
      <template #modal-footer>

        <b-button size="md" variant="dark" @click="$bvModal.hide('bv-modal-add')">
          Cancel
        </b-button>
        <b-button size="md" variant="info" @click="addNewCoins">
          Add To Plan
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
        {key: 'quantity', label: 'Current Quantity', sortable: true, tdClass: "table-current-value"},
        {key: 'percentage', label: 'Current Occupation', sortable: true, tdClass: "table-percentage"},
        {key: 'investPercentage', label: 'Planned Occupation', sortable: true, tdClass: "table-invest-percentage"},
        {key: 'investAmount', label: 'Estimated Value (USD)', sortable: true, tdClass: "table-invest-amount"},
        {key: 'investQuantity', label: 'Estimated Quantity', sortable: true, tdClass: "table-invest-quantity"},

      ], fieldsWait: [
        // A virtual column made up from two fields
        {key: 'index', label: 'Select', tdClass: 'invest-wait-select'},
        {key: 'symbol', label: 'Coin', sortable: true, tdClass: 'invest-wait-symbol'},
        // {key: 'category', label: 'Category', sortable: true},
        {key: 'category', label: 'Category', sortable: true},
        {key: 'price', label: 'Price (USD)', sortable: true},
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
        if (!(investPercentage == 0 && property.percentage == 0&&property.symbol!="USDT")) {
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
      this.investPlan = info.data.contents;
      this.properties = properties;
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
      let investPlan = [];

      for (let property of this.properties) {
        if (property.investPercentage > 0 || property.symbol == "USDT") {
          investPlan.push({"coin": property.symbol, "percentage": property.investPercentage});
        }
      }

      let info = await this.$axios.post("newInvestPlan", {
        "plan": JSON.stringify(investPlan),
        "id": this.$route.params.id,
        "rebalance":false,
      });
      if (info) {
        this.$router.push({name: "SchemeTrade", params: {"id": this.$route.params.id}})
      }
    },

    removeCoin(coin) {
      this.properties.splice(this.properties.findIndex(e => e.symbol == coin), 1);
    },
    addNewCoins() {
      for (let coin of this.selectedCoins) {
        let coinInfo = this.$store.state.coinInfo.coins.find(x => x.symbol == coin);
        let existCoinInfo = this.account.scheme.properties.find(x => x.symbol == coin);
        // console.log(existCoinInfo);
        if (existCoinInfo) {
          this.properties.unshift({
            amount: existCoinInfo.amount,
            quantity: existCoinInfo.quantity,
            symbol: coin,
            percentage: existCoinInfo.percentage * 100,
            name: coinInfo.name,
            investAmount: 0,
            investPercentage: 0,
            investQuantity: 0,
          });
        } else {
          this.properties.unshift({
            amount: 0,
            quantity: 0,
            symbol: coin,
            percentage: 0,
            name: coinInfo.name,
            investAmount: 0,
            investPercentage: 0,
            investQuantity: 0,
          });
        }

      }
      this.selectedCoins = [];
      this.$bvModal.hide("bv-modal-add");
    },
  },

  computed: {
    displayProperties() {
      let modifiedCoin = null;

      let properties = this.properties;
      let USDTInfo = properties.splice(this.properties.findIndex(e => e.symbol == "USDT"), 1);
      if (USDTInfo.length == 0) {
        return [];
      } else {
        USDTInfo = USDTInfo[0];
      }

      //第一步 找到修改的coin是哪个
      for (let property of this.properties) {
        // console.log(property.symbol);
        if (this.properties_backup.length > 0) {
          let modifiedInfo = this.properties_backup.find(x => x.symbol == property.symbol && x.investPercentage != property.investPercentage);
          if (modifiedInfo != undefined) {
            modifiedCoin = modifiedInfo.symbol;
          }
        }
      }

      let accumlatedPercentage = 0;
      //第二步，计算除了此coin外其他coin的累计百分比
      for (let property of this.properties) {
        if (property.symbol != modifiedCoin) {
          accumlatedPercentage += property.investPercentage;
        }
      }

      //第三步，设置修改币的最高百分比
      let remainPercentage = 100;
      let maxPercentage = 100 - accumlatedPercentage;
      let coinInfo = this.properties.find(x => x.symbol == modifiedCoin);
      if (coinInfo != undefined) {
        coinInfo.investPercentage = Math.min(maxPercentage, coinInfo.investPercentage);
        //第四步，计算剩余多少百分比，全部算入USDT中
        remainPercentage = maxPercentage - coinInfo.investPercentage;
      } else { //默认没有币被选中时
        remainPercentage = 100 - accumlatedPercentage;
      }
      USDTInfo.investPercentage = remainPercentage;
      //第五步，计算各币种的预估值
      for (let property of this.properties) {
        property.investAmount = this.account.amount * property.investPercentage / 100;
        property.investQuantity = property.investAmount / this.$store.state.coinInfo.prices[property.symbol];
      }
      // console.log(this.properties,this.properties_backup);
      // console.log(remainPercentage,modifiedCoin);

      this.setPropertiesBackup();//备份一份，用于定位是修改了哪个币，注意一定要放在这里，即修改其他币比例之后！
      this.setRemainPercentage(remainPercentage); // 设置剩余的配置百分比
      let output = null;

      if (this.hideSmall.length > 0) { //复选框选中后hideSmall数组长度由0变成1，多了一个true
        output = properties
            .filter(f => f.percentage > 2); //小额资产定义为占比小于2%的资产
      } else {
        output = properties;
      }

      // console.log(USDTInfo)


      if (this.sortInfo != null) {
        let sort = true;
        if (this.sortInfoBackup != null && this.sortInfo.sortBy == this.sortInfoBackup.sortBy && this.sortInfo.sortDesc == this.sortInfoBackup.sortDesc) { //如果上次排序和此次排序排的是同一个字段，且排序方向一直，则取消排序
          sort = false;
        }
        if (sort) {
          if (this.sortInfo.sortBy == "symbol") { //对于字符串排序
            if (this.sortInfo.sortDesc) {
              output.sort(compare_desc_letter(this.sortInfo.sortBy));
            } else {
              output.sort(compare_asc_letter(this.sortInfo.sortBy));
            }
          } else { //动态修改排序
            if (this.sortInfo.sortDesc) {
              output.sort(compare_desc(this.sortInfo.sortBy));
            } else {
              output.sort(compare_asc(this.sortInfo.sortBy));
            }
          }
        }
        this.setSortInfoBackup();
      }
      //最后把USDT加回去
      USDTInfo.investAmount = this.account.amount * USDTInfo.investPercentage / 100;
      USDTInfo.investQuantity = USDTInfo.investAmount;
      output.unshift(USDTInfo);

      return output;
    },
    waitCoins() { //等待加入的货币
      let differenceSet = this.$store.state.coinInfo.coins.filter((v) => {
        // if(this.properties!=undefined){
        if (this.properties.find(x => x.symbol == v.symbol)) {
          return false;
        } else {
          return true;
        }
        // }else{
        //   return true;
        // }
      })
      for (let index in differenceSet) {
        let property = differenceSet[index];
        property.price = this.$store.state.coinInfo.prices[property.symbol];
      }
      return differenceSet
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
.modal-header .close {
  margin: -20px -20px -25px auto !important;
}

//@media (max-width:769px){
//font-size: 1.5rem;
//}
//一个文件里写了样式，对所有的组件全部适用！
/*从第二个元素开始设置属性*/
@media (min-width: 768px) {
  .invest-table-div {
    .b-table-sticky-header {
      min-height: 22.5rem;
      max-height: 34rem !important;
      overflow: auto;
      //max-height: 100%;
    }
  }
  .invest-status {
    display: flex;
    justify-content: space-between; // 平分三个元素
    span {
      font-family: ubuntu-regular;
      text-align: center;
    }
  }
  .invest-table-wait-div {
    .b-table-sticky-header {
      max-height: 24.7rem !important;
      overflow: auto;
      //max-height: 100%;
    }
  }
  .invest-wait-select {
    width: 70px;
    min-width: 70px;
  }
  .check-coin {
    //margin-top: 0.8rem !important;
    margin-top: 0 !important;
    margin-bottom: 0 !important;
    //position: relative;
    //.check-hide-inner{
    //  position: absolute;
    //  right:0.5rem;
    //}
    //position:

    .form-check-label {
      //float:right;
      font-family: ubuntu-regular;
      font-size: 1rem !important;

      .input-helper {

        &:before {
          width: 20px !important;
          height: 20px !important;
          //margin-top:20px;
          font-size: 1rem;

        }

        &:before, &:after {

          top: -0.7rem !important;
          left: 0.85rem !important;
        }

        &:after {
          //line-height: 20px!important;
          margin-top: 1px;
          margin-left: 0px;
        }
      }
    }
  }
  table#invest-wait-table {

    .invest-wait-symbol {
      text-align: left !important;
      font-size: 1rem;

      img {
        width: 30px;
        height: 30px;
      }

      .percentage {
        font-size: 0.8rem;
      }
    }

    th:nth-child(2) {
      text-align: left !important;
    }
  }
  table#invest-table {
    font-family: 'ubuntu-regular';
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
      width: 180px;
      max-width: 180px;
      min-width: 180px;
    }
    .table-symbol {
      min-width: 240px;
      width: 240px;
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
      min-width: 220px;

      .progress {
        width: 120px;
        display: inline-flex;
        margin-right: 10px;
      }

      .percentage {
        display: inline-block;
        font-size: 15px;
        white-space: nowrap;
        min-width: 60px;
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
        position:sticky;
        top:2.77rem;
        z-index: 1004;
        .table-invest-percentage {
          justify-content: left;

          .progress {
            width: 75%;
            display: inline-flex;
            margin-right: 10px;
          }
          .invest-percentage{


          }
          .percentage {
            display: inline-flex;
            justify-content: space-between;
            font-size: 15px;
            white-space: nowrap;
            min-width: 60px;
            width: 25%;

            .pp-r{
              display: inline-block;
              width:40px;
              text-align: center;
              margin:0;
            }
            .ppp{
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
