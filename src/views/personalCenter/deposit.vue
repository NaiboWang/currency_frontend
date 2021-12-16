<template>
  <div>
    <!-- 面包屑导航区 -->
    <div class="page-header">
      <h3 class="page-title" style="font-size:1.2rem">
      <span class="page-title-icon bg-gradient-info text-white mr-2">
        <i class="mdi mdi-cash-plus" style="content: '\FA9B'"></i>
      </span> Scheme > Deposit </h3>
    </div>
    <div class="row">
      <div class="col-md-5 grid-margin stretch-card" style="text-align: left">
        <div class="card">
          <b-dropdown size="lg" id="test" variant="link"   block toggle-class="text-decoration-none" no-caret>
            <template #button-content>
              <div></div>
            </template>
            <b-input-group class="mt-1 search-form" style="position: sticky;top:0">

              <b-form-input
                  id="filter-input"
                  v-model="filter"
                  type="search"
                  autocomplete="off"
                  placeholder="Type to Search"
              >
              </b-form-input>
              <b-input-group-append>
                <span class="input-group-text"><i class="fa fa-search fa-lg"></i></span>
              </b-input-group-append>
            </b-input-group>

<!--            <el-input placeholder="请输入内容" v-model="filter" style="position: sticky;top:0" class="input-with-select">-->

<!--              <el-button slot="append" icon="el-icon-search" ></el-button>-->
<!--            </el-input>-->
            <b-dropdown-form style="width:100%;max-height:20rem;overflow: auto">

              <b-dropdown-item v-for="coin in coinInfo"  :key="coin.symbol" class="search-item">
                <template #default>
                  <router-link class="real-link" :to="'/scheme/'+$route.params.id+'/deposit/'+coin.symbol+'/0'"><img  :src="staticURL+'pics/'+coin.symbol+'.png'"  alt="image"><span>{{coin.symbol}} - {{coin.name}}</span></router-link>
                </template>
              </b-dropdown-item>
              <div v-if="coinInfo.length==0" style="height:9.4rem;font-family: ubuntu-regular;text-align: center;padding-top: 4.7rem">No coins found.</div>
<!--              <div  v-for="coin in $store.state.coinInfo.coins" :key="coin.symbol" >-->

<!--              </div>-->

            </b-dropdown-form>

          </b-dropdown>
          <div class="card-body">
            <div class="coin-info">

              <img class="coin-img" :src="staticURL+'pics/'+$route.params.coin+'.png'"
                   style="margin-right: 3px" alt="image">
              <h3 style="display: inline-flex">{{ $route.params.coin }}
                ({{ selectedCoin.name }})
                <!--                <span>▼</span>-->
                <svg style="width:40px;height:40px" viewBox="0 0 30 30">
                  <path fill="currentColor" d="M8 9H16L12 16"/>
                </svg>
              </h3>

                            <div style="height:45px" ></div>
            </div>
            <div class="form-group" style="margin-top: 1.5rem">
              <h4>Total Quantity<span style="float:right">{{ selectedCoin.quantity | numFilter_quantity }}</span></h4>

              <!--              <h3></h3>-->
              <h4 style="margin-top:1rem">Total Balance<span style="float:right">{{
                  selectedCoin.amount | numFilter
                }}</span></h4>
              <!--              <h4 style="margin-top:1rem">Total Balance</h4>-->
              <!--              <h3>{{ account.amount | numFilter }} USD</h3>-->
            </div>
            <div style="margin-top: 2rem">
              <p style="font-family: ubuntu-regular;font-size: 1rem">On which blockchain:</p>
              <router-link v-for="(chain,index) in selectedCoin.supportChains" :key="chain.name"
                           type="button" class="btn btn-outline-info btn-chain"
                           :to="{'name':'depositCoinChain', 'params':{'id':$route.params.id,'coin':$route.params.coin,'chain':index}}">
                {{ chain.name }}
              </router-link>

            </div>

            <!--            <h1 class="display-1">Display 1</h1>-->

          </div>
        </div>
      </div>
      <div class="col-md-7 grid-margin stretch-card" style="text-align: left">
        <div class="card">
          <div class="card-body">
            <h4> {{ $route.params.coin }} [{{chainName}}]
              Address:</h4>
            <div class="row" style="margin-top:1rem">
              <div v-if="addressWait"  class="col-md-9"><b-spinner  variant="info"
                                                label="Spinning"></b-spinner> </div>
              <h4 class="col-md-9" v-else style="color:#198ae3;margin-top: 0.2rem">{{ address }}

                <span class="mdi mdi-qrcode" id="popover-target-1"></span>

                <b-popover target="popover-target-1" triggers="hover" placement="bottom"
                           @shown="showQRCode">
                  <!--                  <div style="width: 198px;height: 198px;position:absolute" v-if="qrshow">-->
                  <!--                    <b-spinner variant="info" label="Spinning"></b-spinner>-->
                  <!--                  </div>-->
                  <!--                  <img src="../../assets/images/qrcode.png" style="width: 198px;height: 198px"/>-->
                  <canvas id="canvas" style="width: 198px;height: 198px">
                  </canvas>
                </b-popover>

                <!--                <el-popover-->
                <!--                    placement="bottom-end"-->
                <!--                    width="220"-->
                <!--                    trigger="hover"-->
                <!--         -->
                <!--                >-->
                <!--                  sdf-->
                <!--                    <button slot="reference">sdf</button>-->
                <!--                </el-popover>-->

              </h4>

              <div class="col-md-3 btn-copy-div">
                <button class="btn btn-info btn-rounded btn-copy"
                        :data-clipboard-text="address"> Copy
                </button>
              </div>

            </div>
            <div class="form-group">
              <p style="margin-bottom: 0.5rem">Tips:</p>
              <p>Send only {{ $route.params.coin }}
                [{{chainName}}] to this address. Sending
                any other coin or token to this address may result in the loss and can not be returned. Coins will be
                deposited immediately after 15 blocks confirmation. You can track the process below (refresh the page to
                get the latest deposit logs).</p>
            </div>

          </div>
        </div>
      </div>
      <div class="col-lg-12 grid-margin stretch-card" style="text-align: left;">
        <div class="card">
          <div class="card-body">

            <div class="row">

              <h3 class="col-sm-4">Deposit Logs</h3>


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
                  <div class="col-sm-12 mt-1 form-check form-check-flat form-check-info check-hide">
                    <div class="check-hide-inner">
                      <label class="form-check-label">
                        <input v-model="pagination.showCurrent" type="checkbox" class="form-check-input"
                               @change="getCurrentLogs"> Only show current coin <i
                          class="input-helper"></i> </label>
                    </div>
                  </div>
                </div>
              </b-form-group>

            </div>
            <b-table id="log-table"
                     striped hover responsive
                     show-empty
                     :fields="fields" :items="logs">

              <template #empty>
                <b-spinner style="margin:0 auto" v-if="pagination.firstInvoke" variant="info"
                           label="Spinning"></b-spinner>

              </template>

              <template #cell(coin)="data">
                <img :src="staticURL+'pics/'+data.item.coin+'.png'" style="margin-right: 3px" alt="image">
                {{ data.item.coin }}
              </template>
              <template #cell(quantity)="data">
                {{ data.item.amount | numFilter_quantity }}
              </template>

              <template #cell(time)="data">
                {{ data.item.time }}
              </template>
              <template #cell(address)="data">
                {{ data.item.address }}
              </template>
              <template #cell(transferID)="data">
                <a target="_blank" style="text-decoration: none" :href="'https://bscscan.com/tx/'+data.item.transferID">{{ data.item.transferID | transferIDFilter }}</a>

              </template>
              <template #cell(status)="data">
                {{ data.item.status }}
              </template>

            </b-table>
            <b-pagination
                first-number
                last-number
                v-model="pagination.currentPage"
                :total-rows="pagination.rows"
                :per-page="pagination.perPage"
                aria-controls="my-table"
                @change="getSchemeDepositLogs"
                align="center"
            ></b-pagination>

          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import {getSchemeAccountInfo} from "../../utils/schemeAccount";
import qrcode from "qrcode";
import ClipboardJS from "clipboard";
import {convert_time} from "../../utils/time";

export default {
  async created() {
    this.account = await getSchemeAccountInfo(this.$route.params.id);
    await this.getNewAddress();
    await this.firstLoadLogs();

  },
  mounted() {
    let clipboard = new ClipboardJS('.btn-copy');
    clipboard.on('success', (e) => {
      this.$message.success("Address has been successfully copied to clipboard!");
      // e.clearSelection(); //清除选择，这里不需要
    });
    clipboard.on('error', (e) => {
      this.$message.info("Sorry, something wrong with the clipboard, we cannot copy!")
    });
  },
  data() {
    return {
      account: {
        scheme: {properties: []},
        amount: 0, //账户总余额
        yesterdayAmount: 0,//昨天的余额
        profit: 0,
      },
      logs: [],
      address:"",
      // sortBy: '',
      // sortDesc: false,
      // sortDirection: 'asc',
      notification: null, //新log通知框
      filter: "",//筛选的关键字
      // filterOn: [],//定义可以在哪些字段上过滤，不填就是全部都行
      pagination: {
        currentPage: 1,
        perPage: 5,//每页有几条数据
        rows: 0, //一共多少行
        firstInvoke: true, // 是否第一次调用
        showCurrent: [],//是否隐藏小额资产
      },
      addressWait:true, //等待生成address
      fields: [
        // A virtual column made up from two fields
        {key: 'coin', label: 'Coin', tdClass: 'coin'},
        {key: 'amount', label: 'Quantity'},
        {key: 'time', label: 'Time', tdClass: 'log-time'},
        {key: 'address', label: 'Address'},
        {key: 'transferID', label: 'Transfer ID'},
        {key: 'status', label: 'Status'},
      ],
    }
  },
  methods: {
    showQRCode() {
      let popover = document.querySelector(".popover");
      popover.style.display = "none";
      let canvas = document.getElementById('canvas')
      qrcode.toCanvas(canvas, this.address,
          {

            scale: 6, //大小
            margin: 2, //边距
          }, function (error) {
            if (error) {
              console.error(error)
            }
          });
      popover.style.display = "block";
    },

    async firstLoadLogs() {
      this.pagination.firstInvoke = true; //出现等待的圈
      this.pagination.rows = 0; //分页复位
      this.pagination.currentPage = 1; //分页复位
      this.logs = []; //表格清空
      this.pagination.showCurrent = []; //默认显示所有币种
      await this.getSchemeDepositLogs(1);
      // console.log(this.account, this.$store.state.coinInfo);
      this.pagination.firstInvoke = false; //
      const h = this.$createElement;
      let info = await this.$axios.get("waitTestDelay");
      if (info.new_log) { //如果有新的日志出现
        this.notification = this.$notify({
          title: 'New log available',
          dangerouslyUseHTMLString: true,
          // message: '<span style="color:rgb(17, 115, 239);cursor: pointer" @click="alert(1)">Click here</span> to get the lastest log.',
          message: h('div', {}, [h('el-button', {
            attrs: {
              type: 'text'
            },
            on: {
              click: () => {
                this.firstLoadLogs() //动态渲染元素绑定事件的方法
              }
            },
          }, 'Click here'), h('span', {}, " to get the latest log.")]),
          type: 'info',
          offset: 60,
          duration: 0,//不自动关闭
        });
      }
    },
    async getCurrentLogs() {
      await this.getSchemeDepositLogs(1); //页数归1
    },
    async getNewAddress(){
      this.addressWait = true;
      let info = await this.$axios.post("waitGetSchemeAddress",{"id":this.$route.params.id,"coin":this.$route.params.coin,"chain":this.chainName});
      this.address = info.data.address;
      this.addressWait = false;
      // console.log(info);
    },
    async getSchemeDepositLogs(page) {
      if (page != undefined) { //直接调用this.pagination.currentPage返回的是之前的状态，不合适
        this.pagination.currentPage = page;
      }
      if (this.notification != null) {
        this.notification.close();
      }
      let params = {"info": JSON.stringify(this.$route.params), "pagination": JSON.stringify(this.pagination)}
      // console.log(page, this.pagination.currentPage,params);
      let info = await this.$axios.post("getSchemeDepositLogs", params);
      convert_time(info.data);
      this.logs = info.data.chargeLogs;
      this.pagination.rows = info.data.rows;
    },
  },
  computed: {
    selectedCoin() {
      let coin = this.account.scheme.properties.filter(x => x.symbol == this.$route.params.coin);
      let output = {amount: 0, quantity: 0, supportChains: []};
      if (coin.length != 0) { //如果用户有这个币
        output.amount = coin[0].amount;
        output.quantity = coin[0].quantity;
      }
      let coinInfo = this.$store.state.coinInfo.coins.filter(x => x.symbol == this.$route.params.coin)[0];
      output.supportChains = coinInfo.supportChains;
      output.name = coinInfo.name;
      return output;
    },
    chainName(){
      let supportChains = this.$store.state.coinInfo.coins.filter(x => x.symbol == this.$route.params.coin)[0].supportChains;
      return supportChains[this.$route.params.chain].name;
    },
    coinInfo(){
      return this.$store.state.coinInfo.coins.filter(x=>(x.symbol.toLowerCase().indexOf(this.filter.toLowerCase())>=0||x.name.toLowerCase().indexOf(this.filter.toLowerCase())>=0))
    }
  },
  watch: {
    $route: function (new_route, old_route) {
      this.getNewAddress();
      // console.log(new_route,old_route);
      if(new_route.params.coin != old_route.params.coin && this.pagination.showCurrent.length>0){ //如果切换了币种且勾选了只显示当前币种的日志，则重新得到记录
        this.getCurrentLogs();
      }
    }
  }
}
</script>

<style scoped lang="scss">
h3 {
  font-size: 1.3rem;
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

.check-hide {
  .check-hide-inner {
    right: 2rem;
    top: -0.8rem;
  }
}

</style>
<style lang="scss">
#log-table {
  tbody {
    tr.b-table-empty-row {
      text-align: center;
    }

    td {
      font-size: 1rem !important;
      clear: both; /* 清除左右浮动 */
      max-width: 320px; /* 必须定义宽度 */
      word-break: break-word; /* 文本行的任意字内断开 */
      word-wrap: break-word; /* IE */
      white-space: pre-line; /* CSS 3 (and 2.1 as well, actually) */
      img {
        width: 30px;
        height: 30px;
      }
    }

    .log-time {
      min-width: 150px;
    }

    .coin { //转账ID设置最大列宽
      min-width: 130px;
    }
  }

}

.btn-chain {
  color: #198ae3 !important;
  //font-weight: normal;
  //border: 1px solid transparent!important;
  //width: 7rem !important;
  font-family: ubuntu-regular !important;
  padding: 0.5em 0.5em !important;
  margin-bottom: 5px;
  margin-left: 0 !important;
  margin-right: 5px;
  background-color: transparent !important;


  &:hover {
    color: white !important;
    //background: transparent!important;
  }

  &:not(:disabled):not(.disabled).active:focus {
    box-shadow: 0 0 0 0 !important;
  }

  &.active { //表示同时具有active类和btn-time类的标签的样式
    color: #fff !important;
    background-color: #198ae3 !important;
    border-color: #198ae3 !important;
  }
}

.btn-copy-div {
  margin-top: -3px;

  .btn-copy {
    color: #198ae3 !important;
    //font-weight: normal;
    //border: 1px solid transparent!important;
    width: 7rem !important;
    font-family: ubuntu-regular !important;
    padding: 0.5em 0.5em !important;
    margin-left: 0 !important;
    margin-right: 5px;
    background-color: transparent !important;
    float: right;

    &:hover {
      color: #fff !important;
      background-color: #198ae3 !important;
      border-color: #198ae3 !important;
    }
  }

  //.div-popover=
}

.card{
  button.dropdown-toggle{
    position:absolute;
    top:2.3rem;
    height:45px;
    z-index:999; //设在最上层
  }
  .search-form{
    padding: 0.25rem 2rem 0.25rem 2.7rem;

  }
  .search-item{
    margin-top:0.5rem;
    font-size: 1rem;
    font-family: ubuntu-regular;
    .dropdown-item{
      padding:0; //去掉上层的padding
    }
    .real-link{
      padding: 0.25rem 1.5rem; //在下层加
      color:black;
      text-decoration: none;
      width:100%;
      height:100%;
      display: block;
      img{
        width:20px;
        height:20px;
        margin-right:7px;
        margin-top:-2px;
      }
      span{
        margin-top:2px;
      }

    }


  }
  ul.dropdown-menu{
    width:100%;
    position:absolute;
    left:0;
  }
}
.coin-info {
  position: relative;
  //cursor: pointer;
  img {
    position: absolute;
    margin-right: 1rem !important;
    width: 40px;
    height: 40px;
    border-radius: 100%;
  }

  h3 {
    position: absolute;
    left: 50px;
    top: 7px;

    svg {
      position: absolute;
      right: -2.2rem;
      top: -0.2rem;
    }

    span {
      font-size: 1rem;
      margin-left: 2px;
      margin-top: 5px;
      font-stretch: extra-expanded;
    }
  }


  button {
    height: 45px !important;
    width: 100% !important;
  }


}
</style>
