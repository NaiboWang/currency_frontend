function numFilter (value) { //保留两位小数，每三位加逗号
    let realVal = parseFloat(value).toFixed(2);
    let str = realVal.toString();
    let reg = str.indexOf(".") > -1 ? /(\d)(?=(\d{3})+\.)/g : /(\d)(?=(?:\d{3})+$)/g;
    return str.replace(reg, "$1,");
}
function numFilter_quantity(value) { //不保留两位小数，每三位加逗号
    // let realVal = parseFloat(value).toFixed(8);
    let realVal = Math.round(value * 100000000) / 100000000;
    let str = realVal.toString();
    let reg = str.indexOf(".") > -1 ? /(\d)(?=(\d{3})+\.)/g : /(\d)(?=(?:\d{3})+$)/g;
    return str.replace(reg, "$1,");
}
function transferIDFilter(value) { //不保留两位小数，每三位加逗号
    let str = value.toString();
    let output = str.slice(0,15) + "..." + str.slice(-15);
    return output; //前10位...后10位
}
export {numFilter_quantity,numFilter,transferIDFilter};
