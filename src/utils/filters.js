function numFilter (value) { //保留两位小数，每三位加逗号
    let realVal = parseFloat(value).toFixed(2);
    var str = realVal.toString();
    var reg = str.indexOf(".") > -1 ? /(\d)(?=(\d{3})+\.)/g : /(\d)(?=(?:\d{3})+$)/g;
    return str.replace(reg, "$1,");
}
function numFilter_quantity(value) { //不保留两位小数，每三位加逗号
    var str = value.toString();
    var reg = str.indexOf(".") > -1 ? /(\d)(?=(\d{3})+\.)/g : /(\d)(?=(?:\d{3})+$)/g;
    return str.replace(reg, "$1,");
}
export {numFilter_quantity,numFilter};
