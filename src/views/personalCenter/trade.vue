<template>
  <div>
    <!-- 面包屑导航区 -->
<!--    <div class="page-header">-->
<!--      <h3 class="page-title" style="font-size:1.2rem">-->
<!--      <span class="page-title-icon bg-gradient-info text-white mr-2">-->
<!--        <i class="mdi mdi-wallet" style="content: '\FA9B'"></i>-->
<!--      </span> Scheme > Trade </h3>-->
<!--    </div>-->
    <div class="row">
      <div class="col-md-6 grid-margin stretch-card" style="text-align: left">
        <div class="card">
          <div class="card-body">
            <h3>Scheme Information</h3>
            <form class="forms-sample" style="margin-top: 2rem">
              <div class="form-group">
                <h4>Description</h4>
                <h3 style="font-size:1.4rem">{{ account.scheme.name }} &nbsp; <span
                    v-b-popover.hover.top="'Click to edit the scheme description'" class="mdi mdi-pencil edit"
                    @click="$router.push('/scheme/'+$route.params.id+'/edit')"></span></h3>
              </div>
              <div class="form-group">
                <h4>Total Balance</h4>
                <h3>{{ account.amount | numFilter }} USD</h3>
              </div>
              <div class="form-group">
                <h4>Today's Profit</h4>
                <h3 :style="{color:account.profit >=0?(account.profit==0?'black':'green'):'orangered'}">
                  {{ account.profit | numFilter }}</h3>
              </div>
            </form>
          </div>
        </div>
      </div>
      <div class="col-md-6 grid-margin stretch-card" style="text-align: left">
        <div class="card">
          <div class="card-body">
            <h3>Balance Allocation</h3>

            <doughnut-chart v-if="this.account.amount > 0"
                            style="max-height:300px;margin-left:15%;max-width:400px;margin-top:1.5rem;"
                            :chart-data="chartData"
                            :chart-labels="chartLabels"></doughnut-chart>
            <div v-else style="text-align: center;display: table;width: 100%;height:100%"><h5
                style="display:table-cell;vertical-align:middle;text-align: center">This scheme doesn't have any balance
              now.</h5></div>
          </div>
        </div>
      </div>
      <div class="col-lg-12 grid-margin stretch-card" style="text-align: left;">
        <div class="card">
          <div class="card-body">
            <div class="row">
              <h3 class="col-sm-4" style="margin-top:10px">Portfolio</h3>


              <b-form-group
                  class="col-sm-8"
                  label=""
                  label-for="filter-input"
                  label-cols-sm="0"
                  label-align-sm="right"
                  style="margin-top:0"
              >
                <div class="row">
                  <!--                  <div class="col-sm-2"></div>-->

                  <!--                  <b-form-checkbox-group-->
                  <!--                      v-model="hideSmall"-->
                  <!--                      class="col-sm-6"-->
                  <!--                  >-->
                  <!--                    <b-form-checkbox class="form-check-primary">Hide Small Balance <i class="input-helper"></i></b-form-checkbox>-->
                  <!--                  </b-form-checkbox-group>-->

                  <div class="col-sm-6 form-check form-check-flat form-check-info check-hide">
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
                    <!--                <b-input-group-append>-->
                    <!--                  <b-button :disabled="!filter" @click="filter = ''">Clear</b-button>-->
                    <!--                </b-input-group-append>-->
                  </b-input-group>
                </div>
              </b-form-group>

            </div>
            <b-table id="my-table"
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
                     :fields="fields" fixed :items="displayProperties">
              <!--              <template #emptyfiltered>-->
              <!--                <h4>asdf</h4>-->
              <!--              </template>-->

              <template #cell(symbol)="data">
                <img :src="staticURL+'pics/'+data.item.symbol+'.png'" alt="image">
                {{ data.item.symbol }}
                <div class="percentage" style="color:grey">({{ data.item.name }})</div>
              </template>
              <template #cell(quantity)="data">
                {{ data.item.quantity | numFilter_quantity }}
              </template>

              <template #cell(amount)="data">
                {{ data.item.amount | numFilter }}
              </template>
              <template #cell(category)="data">
                {{ data.item.category }}
              </template>

              <template #cell(percentage)="data">
                <div class="progress" style="width:75%;display: inline-flex;margin-right:10px">
                  <div :class="['progress-bar',progressbarStyles[data.index % 5]]" role="progressbar"
                       :style="{width: data.item.percentage+'%'}"></div>
                </div>
                <div class="percentage">{{ data.item.percentage | numFilter }}%</div>
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


export default {
  async created() {
    await this.getSchemeAccount();
  },
  components: {
    doughnutChart,
  },
  data() {
    return {
      account: {
        scheme: {},
        amount: 0, //账户总余额
        yesterdayAmount: 0,//昨天的余额
        profit: 0,
      },
      chartLabels: [],
      chartData: [],
      properties: [],
      sortBy: '',
      hideSmall: [],//是否隐藏小额资产
      sortDesc: false,
      sortDirection: 'asc',
      filter: null,//筛选的关键字
      filterOn: [],//定义可以在哪些字段上过滤，不填就是全部都行
      pagination: {
        currentPage: 1,
        perPage: 5,//每页有几条数据
        rows: 3, //一共多少行
      },
      progressbarStyles: ["bg-gradient-info", "bg-gradient-primary", "bg-gradient-success", "bg-gradient-danger", "bg-gradient-warning"],
      fields: [
        // A virtual column made up from two fields
        {key: 'symbol', label: 'Coin', sortable: true},
        {key: 'quantity', label: 'Quantity', sortable: true},
        {key: 'amount', label: 'Value (USD)', sortable: true},
        {key: 'percentage', label: 'Occupation', sortable: true},
        {key: 'category', label: 'Category', sortable: true},
      ],
    }
  },
  methods: {
    async getSchemeAccount() {
      this.account = await getSchemeAccountInfo(this.$route.params.id);
      let majorProportion = 0;//账户中主要币种的总额
      for (let index in this.account.scheme.properties) {
        if (index == 10) { //超过10个的比例少的币统一写成others
          let proportion = 100 - majorProportion;
          if (proportion > 1) {
            this.chartData.push(proportion.toFixed(2));
            this.chartLabels.push("Others");
          }
          break;
        } else {
          let proportion = this.account.scheme.properties[index].percentage * 100;
          majorProportion += proportion;
          if (proportion > 1) { //只渲染百分比大于1的项
            this.chartData.push(proportion.toFixed(2));//保留两位小数
            this.chartLabels.push(this.account.scheme.properties[index].symbol);
          }
        }
      }
      // console.log(this.chartLabels, this.chartData);
      // console.log(this.account.scheme);
      for (let property of this.account.scheme.properties) {
        let coinInfo = this.$store.state.coinInfo.coins.find(item => item.symbol == property.symbol); //根据symbol查找对应coin信息
        // console.log(property.amount,property.symbol,.name);
        this.properties.push({
          "symbol": property.symbol,
          "name": coinInfo.name,
          "quantity": property.quantity,
          "amount": property.amount,
          "category": coinInfo.category,
          "percentage": property.percentage * 100,
        });
      }
      this.pagination.rows = this.properties.length;
      // console.log(this.properties);
    },
    onFiltered(filteredItems) {
      // Trigger pagination to update the number of buttons/pages due to filtering
      this.pagination.rows = filteredItems.length;
      this.pagination.currentPage = 1;
    }
  },
  computed: {
    displayProperties() {
      // Create an options list from our fields
      // console.log(this.hideSmall)
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
  &:before{
    font-size: 22.4px;
  }
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
//一个文件里写了样式，对所有的组件全部适用！
/*从第二个元素开始设置属性*/

@media (min-width: 768px) {
  table {
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
      font-size: 17px !important;

      &:nth-of-type(n+2) {
        text-align: center !important;
      }
    }

    td {
      font-size: 17px !important;
      img{
        margin-right:3px;
        margin-top:-3px;
      }
      &:nth-of-type(n+2) {
        text-align: center !important;
      }

      div {
        font-size: 15px;
      }
    }
  }
  .percentage {
    display: inline-flex;
    font-size: 15px;
    @media (max-width: 768px) {
      font-size: 13px;
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
}
@media (max-width: 768px){
  table#my-table{
    tbody{
      tr{
        td{
          font-size:13px!important;
        }
      }
    }
  }
}
.check-hide {
  margin-top: 0.8rem !important;

  position: relative;
  .check-hide-inner{
    position: absolute;
    right:0.5rem;
  }
  .form-check-label {
    //float:right;
    font-family: ubuntu-regular;
    font-size: 1rem !important;

    .input-helper{

      &:before{
        width:20px!important;
        height:20px!important;
        margin-top:2px;
        font-size:1rem;
      }
      &:after{
        line-height: 20px!important;
        margin-top:2px;
        margin-left:1px;
      }
    }
  }
}

</style>
