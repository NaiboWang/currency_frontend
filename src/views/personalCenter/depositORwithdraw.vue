<template>
  <div>
    <!-- 面包屑导航区 -->
    <!--    <div class="page-header">-->
    <!--      <h3 class="page-title" style="font-size:1.2rem">-->
    <!--      <span class="page-title-icon bg-gradient-info text-white mr-2">-->
    <!--        <i class="mdi mdi-cash-plus" style="content: '\FA9B'"></i>-->
    <!--      </span> Scheme > {{ $route.name == "withdrawCoinChain" ? 'Withdraw' : 'Deposit' }} </h3>-->
    <!--    </div>-->
    <div class="row">
      <div class="col-md-5 grid-margin stretch-card" style="text-align: left">
        <div class="card">
          <b-dropdown size="lg" variant="link" block toggle-class="text-decoration-none" no-caret>
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
            <b-dropdown-form :style="{width:'100%',maxHeight:'20rem',overflow: 'auto'}">

              <b-dropdown-item v-for="coin in coinInfo" :key="coin.symbol" class="search-item">
                <template #default>
                  <!--                  <router-link class="real-link" :to="'/scheme/'+$route.params.id+'/deposit/'+coin.symbol+'/0'"><img-->
                  <!--                      :src="staticURL+'pics/'+coin.symbol+'.png'"-->
                  <!--                      alt="image"><span>{{ coin.symbol }} - {{ coin.name }}</span></router-link>-->
                  <router-link class="real-link"
                               :to="{'name':$route.name, 'params':{'id':$route.params.id,'coin':coin.symbol,'chain':0}}">
                    <img
                        :src="staticURL+'pics/'+coin.symbol+'.png'"
                        alt="image"><span>{{ coin.symbol }} - {{ coin.name }}</span></router-link>
                </template>
              </b-dropdown-item>
              <div v-if="coinInfo.length==0"
                   style="height:9.4rem;font-family: ubuntu-regular;text-align: center;padding-top: 4.7rem">No coins
                found.
              </div>
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

              <div style="height:45px"></div>
            </div>
            <div class="form-group" style="margin-top: 1.5rem">
              <div v-if="$route.name=='withdrawCoinChain'">
                <h4>Quantity on {{ chainInfo.chainInfo.name }}<span
                    style="float:right">{{ chainInfo.userInfo.quantity | numFilter_quantity }}</span></h4>

                <!--              <h3></h3>-->
                <h4 style="margin-top:1rem">Balance on {{ chainInfo.chainInfo.name }}<span style="float:right">{{
                    chainInfo.userInfo.balance | numFilter
                  }}</span></h4>

                <h5 style="margin-top:1rem">24H Withdraw Limit
                  <span style="float:right">{{
                      chainInfo.chainInfo.withdrawLimit
                    }}</span></h5>
                <h5 style="margin-top:1rem">Transaction Fee
                  <span style="float:right">{{
                      chainInfo.chainInfo.transactionFee
                    }}</span></h5>
                <h5 style="margin-top:1rem">Max Withdraw Amount
                  <el-popover
                      placement="right"
                      width="300"
                      trigger="hover"
                  >
                    <i class="el-icon-info" slot="reference"></i>
                    <div
                        v-if="chainInfo.chainInfo.withdrawLimit -chainInfo.userInfo.withdrawAmount >=chainInfo.userInfo.quantity">
                      {{ chainInfo.userInfo.quantity | numFilter_quantity }} (Quantity on
                      {{ chainInfo.chainInfo.name }}) - {{ chainInfo.chainInfo.transactionFee | numFilter_quantity }}
                      (Transaction Fee) = {{
                        maxAmount
                            | numFilter_quantity
                      }}
                    </div>
                    <div v-else>
                      {{ chainInfo.chainInfo.withdrawLimit | numFilter_quantity }} (24H withdraw limit on
                      {{ chainInfo.chainInfo.name }}) - {{ chainInfo.userInfo.withdrawAmount | numFilter_quantity }}
                      (already withdrawn within 24H) - {{ chainInfo.chainInfo.transactionFee | numFilter_quantity }}
                      (Transaction Fee) = {{
                        maxAmount
                            | numFilter_quantity
                      }}
                    </div>
                  </el-popover>
                  <span style="float:right">{{
                      maxAmount
                    }}</span></h5>
                <p>If won't charge fee for internal address withdrawal. Please ignore the fee and the target address
                  will receive all funds.</p>
              </div>
              <div v-else>
                <h4>Total Quantity<span style="float:right">{{ selectedCoin.quantity | numFilter_quantity }}</span></h4>

                <!--              <h3></h3>-->
                <h4 style="margin-top:1rem">Total Balance<span style="float:right">{{
                    selectedCoin.amount | numFilter
                  }}</span></h4>

              </div>


              <!--              <h4 style="margin-top:1rem">Total Balance</h4>-->
              <!--              <h3>{{ account.amount | numFilter }} USD</h3>-->
            </div>
            <div style="margin-top: 2rem">
              <p style="font-family: ubuntu-regular;font-size: 1rem">On which blockchain:</p>
              <router-link v-for="(chain,index) in selectedCoin.supportChains" :key="chain.name"
                           type="button" class="btn btn-outline-info btn-chain"
                           :to="{'name':$route.name, 'params':{'id':$route.params.id,'coin':$route.params.coin,'chain':index}}">

                {{ chain.name }}
              </router-link>

            </div>

            <!--            <h1 class="display-1">Display 1</h1>-->

          </div>
        </div>
      </div>
      <div class="col-md-7 grid-margin stretch-card" style="text-align: left">
        <div class="card">
          <div v-if="$route.name=='depositCoinChain'" class="card-body">
            <h4> {{ $route.params.coin }} [{{ chainInfo.chainInfo.name }}]
              Address:</h4>
            <div class="row" style="margin-top:1rem">
              <div v-if="addressWait" class="col-md-9">
                <b-spinner variant="info"
                           label="Spinning"></b-spinner>
              </div>
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
                [{{ chainInfo.chainInfo.name }}] to this address. Sending
                any other coin or token to this address may result in the loss and can not be returned. Coins will be
                deposited immediately after 15 blocks confirmation. You can track the process below (refresh the page to
                get the latest deposit logs).</p>
            </div>

          </div>
          <div v-else class="card-body">
            <h4> {{ $route.params.coin }} [{{ chainInfo.chainInfo.name }}]
              Withdraw:</h4>
            <b-form-group
                style="margin-top:0;position:relative"
            >
              <b-form-input required @change="validateAddress" v-model="withdrawForm.address" :state="validations.address"
                            placeholder="Address" style="font-size:0.9rem;margin-top:1.5rem"></b-form-input>

              <b-form-invalid-feedback :state="validations.address">
                Address must be 1 to 100 characters
              </b-form-invalid-feedback>
              <div class="address-book" :style="{right:validations.address==null?'15px':'35px'}"
                   @click="showAddressBook">Address Book
              </div>
              <b-dropdown size="lg" variant="link" block toggle-class="text-decoration-none" class="withdraw-book"
                          no-caret>
                <template #button-content>
                  <div id="realAddressButton"></div>
                </template>
                <b-modal centered id="bv-modal-scheme-new">
                  <template #modal-title>
                    New Address
                  </template>
                  <div class="d-block text-center">
                    <h4>Add new address for coin {{selectedCoin.symbol}} on chain {{chainInfo.chainInfo.name}}</h4>
                    <form ref="form">
                      <b-form-group
                          class="new-address"
                          style="margin-top:0;position:relative"
                      >
                        <b-form-input required @change="validateNewTag" v-model="addressForm.tag" :state="validationAddress.tag"
                                      placeholder="Tag Name" style="font-size:0.9rem;"></b-form-input>

                        <b-form-invalid-feedback :state="validations.tag">
                          Tag name must between 2 to 30 characters
                        </b-form-invalid-feedback>
                      </b-form-group>
                    <b-form-group
                        class="new-address"
                        style="margin-top:0;position:relative"
                    >
                      <b-form-input required @change="validateNewAddress" v-model="addressForm.address" :state="validationAddress.address"
                                    placeholder="Address" style="font-size:0.9rem;"></b-form-input>

                      <b-form-invalid-feedback :state="validationAddress.address">
                        Address must be 1 to 100 characters
                      </b-form-invalid-feedback>
                    </b-form-group>

                    </form>
                  </div>
                  <template #modal-footer>

                    <b-button size="sm" variant="dark" @click="$bvModal.hide('bv-modal-scheme-new')">
                      No
                    </b-button>
                    <b-button size="sm" variant="info" @click="submitAddress">
                      Yes
                    </b-button>

                  </template>
                </b-modal>

                <b-dropdown-form style="width:100%;max-height:20rem;overflow: auto">
                  <b-dropdown-item v-for="(book,index) in chainInfo.userInfo.books" :key="book.tag + index">
                    <div style="width:100%;white-space:normal;word-wrap:break-word;font-family: ubuntu-regular"
                         @click="fillAddress(book.address)">
                      <!--                       如果文字无法换行，首先看是不是white-space属性有问题！-->
                      <div>Tag: {{ book.tag }}</div>
                      <div>Address: {{ book.address }}</div>
                    </div>
                  </b-dropdown-item>
                  <div v-if="chainInfo.userInfo.books.length==0"
                       style="height:9.4rem;font-family: ubuntu-regular;text-align: center;padding-top: 4.7rem">No
                    address saved.
                  </div>
                </b-dropdown-form>
                <b-input-group v-b-modal.bv-modal-scheme-new class="add-new-address">
                  Add a new address
                </b-input-group>
              </b-dropdown>
            </b-form-group>
            <b-form-group
                style="margin-top:0"
            >
              <div class="row" style="margin-left:0;margin-right:0">
                <div class="col-md-6" style="padding-left: 0">
                  <b-form-input type="number" class="form-quantity" v-model="withdrawForm.quantity"
                                :state="validations.quantity" placeholder="Quantity" @change="validateQuantity"
                                style="font-size:0.9rem"></b-form-input>

                  <b-form-invalid-feedback :state="validations.quantity">
                    Quantity must bigger than 0 and smaller than {{ maxAmount }}
                  </b-form-invalid-feedback>
                  <div class="all-amount" @click="withdrawForm.quantity = maxAmount"
                       :style="{right:validations.quantity==null?'35px':'55px'}">
                    {{ chainInfo.chainInfo.withdrawLimit - chainInfo.userInfo.withdrawAmount > chainInfo.userInfo.quantity ? "ALL" : "MAX" }}
                  </div>
                </div>
                <div class="col-md-6" style="padding-right:0;padding-left:0;float:right">
                  <div class="withdraw-hint"><span>You will get</span><span
                      style="float:right"> {{ evaluateUSDT | numFilter }} USDT</span></div>

                </div>
              </div>
            </b-form-group>
            <b-form-group
                style="margin-top:0"
            >
              <b-button variant="gradient-info" @click="withdrawCoin" style="float:right">Submit</b-button>
            </b-form-group>

            <div class="form-group">
              <p style="margin-bottom: 0.5rem">Tips:</p>
              <p>Please make sure the {{ $route.params.coin }}
                [{{ chainInfo.chainInfo.name }}] address you input is correct. If you input a wrong address or forget to
                input
                some necessary information (like Memo for some coin), Currency Market won't cover the loss for you.
                For your assets safety, it needs manual reviews for big amount withdrawal. Usually it takes 10-30
                minutes. The review time is 0:00-16:00 (UTC) everyday. You can track the process below (refresh the page
                to
                get the latest deposit logs).</p>

            </div>
          </div>


        </div>
      </div>
      <div class="col-lg-12 grid-margin stretch-card" style="text-align: left;">
        <div class="card">
          <div class="card-body">

            <div class="row">

              <h3 class="col-sm-4">{{ $route.name == "withdrawCoinChain" ? 'Withdraw' : 'Deposit' }} Logs</h3>


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
                <a target="_blank" style="text-decoration: none" :href="'https://bscscan.com/tx/'+data.item.transferID">{{
                    data.item.transferID | transferIDFilter
                  }}</a>

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
                @change="getSchemeLogs"
                align="center"
            ></b-pagination>

          </div>
        </div>
      </div>
    </div>
    <b-modal centered id="bv-modal-submit">
      <template #modal-title>
        Withdraw Confirm
      </template>
      <div class="d-block text-center">
        <h4 style="text-align: left;padding-left:1rem">Do you really want to withdraw {{withdrawForm.quantity}} {{selectedCoin.symbol}} on chain {{chainInfo.chainInfo.name}}?</h4>
      </div>
      <template #modal-footer>

        <b-button size="sm" variant="dark" @click="$bvModal.hide('bv-modal-submit')">
          No
        </b-button>
        <b-button size="sm" variant="info" @click="submitWithdraw">
          Yes
        </b-button>

      </template>
    </b-modal>
  </div>

</template>

<script>

import {getSchemeAccountInfo} from "../../utils/schemeAccount";
import qrcode from "qrcode";
import ClipboardJS from "clipboard";
import {convert_time} from "../../utils/time";
import store from "../../store";

export default {
  async created() {
    this.account = await getSchemeAccountInfo(this.$route.params.id);
    if (this.$route.name == "depositCoinChain") {
      await this.getNewAddress();
    }
    await this.firstLoadLogs();
  },
  mounted() {
    if (this.$route.name == "depositCoinChain") {
      this.clipboard = new ClipboardJS('.btn-copy');
      this.clipboard.on('success', (e) => {
        this.$message.success("Address has been successfully copied to clipboard!");
        // e.clearSelection(); //清除选择，这里不需要
      });
      this.clipboard.on('error', (e) => {
        this.$message.info("Sorry, something wrong with the clipboard, we cannot copy!")
      });
    }
  },
  destroyed() {
    if (this.clipboard != null) {
      this.clipboard.destroy(); //页面退出时销毁clipboard
    }
    if (this.notification != null) { //关闭通知
      this.notification.close();
    }
  },
  data() {
    return {
      account: {
        scheme: {properties: []},
        amount: 0, //账户总余额
        yesterdayAmount: 0,//昨天的余额
        profit: 0,
      },
      addressForm:{
        tag:"",
        address:"",
      },
      validationAddress:{
        tag:null,
        address:null,
      },
      withdrawForm: {
        address: "",
        quantity: 0,
      },
      validations: {
        address: null,
        quantity: null,
      },
      logs: [],
      clipboard: null,
      address: "",
      // sortBy: '',
      // sortDesc: false,
      // sortDirection: 'asc',
      notification: null, //新log通知框
      filter: "",//筛选的关键字
      // filterOn: [],//定义可以在哪些字段上过滤，不填就是全部都行
      pagination: {
        currentPage: 1,
        perPage: 10,//每页有几条数据
        rows: 0, //一共多少行
        firstInvoke: true, // 是否第一次调用
        showCurrent: [],//是否隐藏小额资产
      },
      addressWait: true, //等待生成address
      fields: [
        // A virtual column made up from two fields
        {key: 'coin', label: 'Coin', tdClass: 'coin'},
        {key: 'amount', label: 'Quantity'},
        {key: 'time', label: 'Time', tdClass: 'log-time'},
        {key: 'address', label: 'Address', tdClass: 'log-address'},
        {key: 'transferID', label: 'Transfer ID', tdClass: 'log-address'},
        {key: 'status', label: 'Status'},
      ],
    }
  },
  methods: {
    validateQuantity() {
      if (this.withdrawForm.quantity <= 0 || this.withdrawForm.quantity > this.maxAmount) {
        this.validations.quantity = false;
      } else {
        this.validations.quantity = null;
      }
    },
    validateAddress(){
      if (this.withdrawForm.address == "" || this.withdrawForm.address.length>100) {
        this.validations.address = false;
      } else {
        this.validations.address = null;
      }
    },
    validateNewAddress(){
      if (this.addressForm.address == "" || this.addressForm.address.length>100) {
        this.validationAddress.address = false;
      } else {
        this.validationAddress.address = null;
      }
    },
    validateNewTag(){
      if (this.addressForm.tag == "" || this.addressForm.tag.length>100) {
        this.validationAddress.tag = false;
      } else {
        this.validationAddress.tag = null;
      }
    },
    async withdrawCoin() {
      this.validateAddress();
      this.validateQuantity();
      if (Object.values(this.validations).includes(false) || this.withdrawForm.quantity == 0) {
        return false;
      }
      this.$bvModal.show('bv-modal-submit');
      // this.$confirm(`Do you really want to withdraw ${this.withdrawForm.quantity} ${this.selectedCoin.symbol} on chain ${this.chainInfo.chainInfo.name}?`, 'Confirm', {
      //   confirmButtonText: 'Yes',
      //   cancelButtonText: 'No',
      //   // cancelButtonClass: 'btn-custom-cancel',
      //   type: 'success'
      // }).then(async () => {
      //
      // }).catch(() => { //取消选项后的操作
      //   // this.withdrawForm.quantity = 0;
      //   this.validations.quantity = null;
      //   this.validations.address = null;
      // });
    },
    async submitWithdraw() {
      let params = {
        "id": this.$route.params.id,
        "coin": this.$route.params.coin,
        "chain": this.chainInfo.chainInfo.name,
        "address": this.withdrawForm.address,
        "quantity": this.withdrawForm.quantity
      };
      let info = await this.$axios.post("withdrawCoin", {"params": JSON.stringify(params)});
      if (info) {
        this.withdrawForm.quantity = 0;
        this.validations.quantity = null;
        this.validations.address = null;
        this.$bvModal.hide("bv-modal-submit");
      }
    },
    showAddressBook() {
      let btn = document.getElementById("realAddressButton");
      btn.click();
    },
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
    fillAddress(address){
      this.withdrawForm.address=address;
      this.validateAddress();
    },
    checkFormValidity() {
      let valid = true;
      if (this.addressForm.address == "" || this.addressForm.address.length>100) {
        this.validationAddress.address = false;
        valid = false;
      } else {
        this.validationAddress.address = null;
      }
      if (this.addressForm.tag == "" || this.addressForm.address.length>30) {
        this.validationAddress.tag = false;
        valid=false;
      } else {
        this.validationAddress.tag = null;
      }
      return valid;
    },
    async submitAddress(){
      // Exit when the form isn't valid
      if (!this.checkFormValidity()) {
        return null;
      }
      let info = await this.$axios.post("addAddressBook", {
        "id": this.$route.params.id,
        "coin": this.$route.params.coin,
        "chain": this.chainInfo.chainInfo.name,
        "tag":this.addressForm.tag,
        "address":this.addressForm.address,
      });
      if(info){
        this.$bvModal.hide('bv-modal-scheme-new');
        this.addressForm.address="";
        this.addressForm.tag="";
        this.account = await getSchemeAccountInfo(this.$route.params.id); //重新获得用户财产信息
      }

      // // Hide the modal manually
      // this.$nextTick(() => {
      //   this.$bvModal.hide('modal-prevent-closing')
      // })
    },
    async firstLoadLogs() {
      this.pagination.firstInvoke = true; //出现等待的圈
      this.pagination.rows = 0; //分页复位
      this.pagination.currentPage = 1; //分页复位
      this.logs = []; //表格清空
      this.pagination.showCurrent = []; //默认显示所有币种
      await this.getSchemeLogs(1);
      // console.log(this.account, this.$store.state.coinInfo);
      this.pagination.firstInvoke = false; //
      const h = this.$createElement;
      let info = await this.$axios.post("waitSchemeLogs", {"type": this.$route.name == "depositCoinChain" ? "deposit" : "withdraw"});
      if (info.new_log) { //如果有新的日志出现
        this.notification = this.$notify({
          title: "New " + (this.$route.name == "depositCoinChain" ? "deposit" : "withdraw") + " log available",
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
      await this.getSchemeLogs(1); //页数归1
    },
    async getNewAddress() {
      this.addressWait = true;
      let info = await this.$axios.post("waitGetSchemeAddress", {
        "id": this.$route.params.id,
        "coin": this.$route.params.coin,
        "chain": this.chainInfo.chainInfo.name,
      });
      this.address = info.data.address;
      this.addressWait = false;
      // console.log(info);
    },
    async getSchemeLogs(page) {
      if (page != undefined) { //直接调用this.pagination.currentPage返回的是之前的状态，不合适
        this.pagination.currentPage = page;
      }
      if (this.notification != null) {
        this.notification.close();
      }
      let params = {
        "info": JSON.stringify(this.$route.params),
        "pagination": JSON.stringify(this.pagination),
        "type": this.$route.name == "depositCoinChain" ? "deposit" : "withdraw"
      }
      // console.log(page, this.pagination.currentPage,params);
      let info = await this.$axios.post("getSchemeLogs", params);
      convert_time(info.data);
      this.logs = info.data.logs;
      this.pagination.rows = info.data.rows;
    },
  },
  computed: {
    selectedCoin() {
      let coin = this.account.scheme.properties.filter(x => x.symbol == this.$route.params.coin);
      let output = {amount: 0, quantity: 0, addresses: [], supportChains: []};
      if (coin.length != 0) { //如果用户有这个币
        output.amount = coin[0].amount;
        output.quantity = coin[0].quantity;
      }
      let coinInfo = this.$store.state.coinInfo.coins.filter(x => x.symbol == this.$route.params.coin)[0];
      output.supportChains = coinInfo.supportChains;
      output.name = coinInfo.name;
      output.symbol = coinInfo.symbol;
      return output;
    },
    chainInfo() {
      let output = {
        "chainInfo": {}, "userInfo": {
          "quantity": 0, "balance": 0,
          "withdrawAmount": 0,//24小时内用户对这个币提了多少个
          "books": [],//地址簿
        }
      };
      let supportChains = this.$store.state.coinInfo.coins.filter(x => x.symbol == this.$route.params.coin)[0].supportChains;
      let coin = this.account.scheme.properties.filter(x => x.symbol == this.$route.params.coin);
      if (coin.length != 0) { //如果用户有这个币
        // console.log(coin[0].addresses)
        let chain = coin[0].addresses.filter(x => x.chain == supportChains[this.$route.params.chain].name);
        if (chain.length != 0) {//如果用户的这个币上有这个链
          output["userInfo"].balance = chain[0].balance;
          output["userInfo"].quantity = chain[0].amount;
          output["userInfo"].withdrawAmount = chain[0].withdrawAmount;
          output["userInfo"].books = this.$lodash.clone(chain[0].books).reverse(); //倒序
        }
      }
      output["chainInfo"] = supportChains[this.$route.params.chain];
      return output;
    },
    coinInfo() {
      return this.$store.state.coinInfo.coins.filter(x => (x.symbol.toLowerCase().indexOf(this.filter.toLowerCase()) >= 0 || x.name.toLowerCase().indexOf(this.filter.toLowerCase()) >= 0));
    },
    evaluateUSDT() {
      if (this.withdrawForm.quantity <= this.maxAmount && this.withdrawForm.quantity >= 0) {
        return this.withdrawForm.quantity * this.$store.state.coinInfo.prices[this.selectedCoin.symbol]
      } else {
        return 0;
      }
    },
    maxAmount() { //最多可以提的币的数量
      //用户每天在该链该币上最多可以提的数量是这个链在这个币上限制的数量减去用户今天已经提取的数量withdrawAmount
      //计算方法：用户总币数与最多可提的数量的最小值减去手续费，如果小于0就是0，即不可提
      let minNum = Math.min(this.chainInfo.chainInfo.withdrawLimit - this.chainInfo.userInfo.withdrawAmount, this.chainInfo.userInfo.quantity);
      let maxAmount = Math.max(0, minNum - this.chainInfo.chainInfo.transactionFee);
      return maxAmount;
    }
  },
  watch: {
    $route: function (new_route, old_route) {
      if (this.$route.name == "depositCoinChain") {
        this.getNewAddress();
      }
      if (new_route.params.coin != old_route.params.coin && this.pagination.showCurrent.length > 0) { //如果切换了币种且勾选了只显示当前币种的日志，则重新得到记录
        this.getCurrentLogs();
      }
      if (new_route.params.coin != old_route.params.coin) {
        this.filter = "";//切换新币种后，清空搜索框
      }
      this.withdrawForm.address = "";
      this.withdrawForm.quantity = 0;
      this.validations.address = null;
      this.validations.quantity = null;
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
$info-color: #198ae3; //其他组件无法使用，scss的私有变量无法共享！
.withdraw-hint {
  background-color: #ebedf2;
  width: 100%;
  height: 44px;
  //margin-left: 5%;
  margin-right: 0;
  font-family: ubuntu-regular;
  padding-left: 10px;
  padding-right: 10px;
  padding-top: 12px;
  @media (max-width: 576px) {
    margin: 10px 0;
    width: 100%;
  }
}

.form-quantity::-webkit-inner-spin-button {
  -webkit-appearance: none !important; //去除input=number默认的箭头
  -moz-appearance: textfield;
  //margin: 0;
}

.add-new-address {
  padding: 1.5rem 2rem 1rem 2.7rem;
  text-align: center;
  display: block;
  font-family: ubuntu-regular;
  font-size: 1rem;
  color: $info-color;
  border-top: solid 1px lightgrey;
  cursor: pointer;
}
.new-address{
  .invalid-feedback{
    text-align: left;
  }
}
.invalid-feedback{
  white-space: nowrap;
}
.address-book {
  position: absolute;
  //top:37px;
  //background-color: white;
  top: 25px;
  line-height: 2.8rem;
  height: 40px;
  cursor: pointer;
  color: $info-color;
}
.modal-content{
  background-color: white!important;
}
.new-address{
  padding:0.5rem 0.2rem 0 0.2rem;
}
.all-amount {
  position: absolute;
  top: 0;
  line-height: 2.8rem;
  height: 44px;
  cursor: pointer;
  //font-family: normal;
  font-size: 15px;
  color: $info-color;
}

//.invalid-feedback+.address-book{
//  right:35px;
//}
#log-table {
  thead {
    th:nth-child(4), th:nth-child(5) {
      text-align: left !important;
    }
  }

  tbody {
    tr.b-table-empty-row {
      text-align: center;
    }

    td {
      //text-align: left!important;
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

    .log-address {
      text-align: left !important;
    }

    .coin { //转账ID设置最大列宽
      min-width: 130px;
    }
  }

}

.btn-chain {
  color: $info-color !important;
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
    background-color: $info-color !important;
    border-color: $info-color !important;
  }
}

.btn-copy-div {
  margin-top: -3px;

  .btn-copy {
    color: $info-color !important;
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
      background-color: $info-color !important;
      border-color: $info-color !important;
    }
  }

  //.div-popover=
}

.card {
  button.dropdown-toggle {
    position: absolute;
    top: 2.3rem;
    height: 45px;
    z-index: 999; //设在最上层
  }

  .search-form {
    padding: 0.25rem 2rem 0.25rem 2.7rem;
  }

  .search-item {
    margin-top: 0.5rem;
    font-size: 1rem;
    font-family: ubuntu-regular;

    .dropdown-item {
      padding: 0; //去掉上层的padding
    }

    .real-link {
      padding: 0.25rem 1.5rem; //在下层加
      color: black;
      text-decoration: none;
      width: 100%;
      height: 100%;
      display: block;

      img {
        width: 20px;
        height: 20px;
        margin-right: 7px;
        margin-top: -2px;
      }

      span {
        margin-top: 2px;
      }

    }


  }

  ul.dropdown-menu {
    width: 100%;
    position: absolute;
    left: 0;
  }
}

.withdraw-book { //放在下面的会替换上面的样式！
  button.dropdown-toggle {
    top: -48px;
    //font-family: normal;
    //font-size:15px;
    //color:$info-color;
    //text-align: right;
    z-index: -1;

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
