import {get_date_difference} from "./time";
import {compare_desc} from "./compare";
import axios from "../plugins/axios";
import store from "../store";
export async function getSchemeAccountInfo(id) {
    let info = await axios.get('getSchemeAccount', {
        params: {
            "id": id,
        }
    });
    let account = {};
    account.amount = 0;//账户总余额
    let date = new Date();
    account.yesterdayAmount = 0.0;//昨晚最后的余额是多少
    for (let property of info.data.properties) {
        property.amount = 0; //该币的总额
        property.quantity = 0; //该币的总数
        property.percentage = 0;//该币占的比例
        for (let address of property.addresses) { //每个币有好几个链，余额统一算到该币中
            let USD = address.amount * store.state.coinInfo.prices[property.symbol]
            address.balance = USD;
            property.amount += USD;
            property.quantity += address.amount;
            account.amount += USD;
        }
    }
    for (let property of info.data.properties) {
        property.percentage = property.quantity == 0 ? 0 : property.amount / account.amount; //该币所占比例
    }
    info.data.propertyLogs.reverse();//从新到旧排列
    for (let propertyLog of info.data.propertyLogs) {
        if (get_date_difference(date, propertyLog["time"]["$date"]) >= 1) { //找到昨天记录的最后一条资产总额记录
            account.yesterdayAmount = propertyLog["value"];
            break;
        }
    }
    info.data.properties.sort(compare_desc("amount")); //sort函数会修改原来的数组！
    account.scheme = info.data;
    account.propertyLogLength = info.data.propertyLogs.length;
    if (account.amount == 0) {
        account.profit = 0; //如果账户没钱，或者已经被全部取走，则今日收益为0
        account.profitPercentage = 0;
    } else if (account.yesterdayAmount == 0) {
        account.profit = 0; //如果昨天账户没钱，则今日收益为0
        account.profitPercentage = 0;
    } else {
        account.profitPercentage = 100 * (account.amount-account.yesterdayAmount) / account.yesterdayAmount;
        account.profit = account.amount - account.yesterdayAmount;
    }
    return account;
}
