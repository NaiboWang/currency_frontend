/**
 * 将数组里所有的mongodb的datetime格式转换成js的datetime格式
 * @param {*} o
 */
import moment from "moment";

export function convert_time(o) {
    for (let i in o) {
        // console.log(i,o[i])
        // eslint-disable-next-line no-prototype-builtins
        if (o[i].hasOwnProperty("$date")) {
            o[i] = new Date(o[i].$date);
            o[i] = moment(+o[i]).utcOffset(8).format('YYYY-MM-DD HH:mm:ss UTC+8');
        }
        if (typeof (o[i]) == "object") {
            //going on step down in the object tree!!
            convert_time(o[i]);
        }
    }
}
