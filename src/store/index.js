import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
export default new Vuex.Store({
    state: {
        backRef: "/",
        activePath: "/personalModelList", //默认激活的标签
        activeManagementPath: "/managementInfo", //默认激活的标签
        iconObj: {
            '0': 'iconfont-user icon-users',
            '1': 'iconfont icon-tijikongjian',
            '2': 'iconfont icon-danju',
            '21': 'el-icon-sold-out',
            '22': 'el-icon-sell',
            '3': 'el-icon-menu icon-align',
            '4': 'iconfont icon-user',
            '5': 'el-icon-s-claim icon-align',
            '6': 'el-icon-tickets icon-align',
            '41': 'el-icon-info',
            '42': 'el-icon-lock',
            '43': 'el-icon-wallet',
            '102': 'iconfont icon-danju',
            '145': 'iconfont icon-baobiao'
        },
        userInfo: {
            nickname: '',
            role: "",
            username: "",
            profile:"user.png",
        },
        coinInfo:{

        },
        scheme_num:0,
        amount:0,
        startAmount:0, //overview起始day的账户余额
    },
    mutations: {
        setBackRef(state, address) {
            state.backRef = address;
        },
        setActivePath(state, path) {
            state.activePath = path;
        },
        setActiveManagementPath(state, path) {
            state.activeManagementPath = path;
        },
        setUserInfo(state, userInfo) {
            state.userInfo = userInfo;
        },
        setCoinInfo(state, coinInfo) {
            state.coinInfo = coinInfo;
        },
        setUserProfile(state, profile) {
            state.userInfo.profile = profile;
        },
        setSchemeNum(state, scheme_num) {
            state.scheme_num = scheme_num;
        },
        setStartAmount(state, amount) {
            state.startAmount = amount;
        },
        setAmount(state, amount) {
            state.amount = amount;
        },
    },
    actions: {},
    modules: {},
})
