/**
 * 邮箱
 * @param {*} s
 */
const isEmail =  function (s) {
    return /^[0-9a-zA-Z_.-]+[@][0-9a-zA-Z_.-]+([.][a-zA-Z]+){1,2}$/.test(s)
}
const validateEmail = (rule, value, callback) => {
    if (!isEmail(value)) {
        callback(new Error('Please enter correct email address'))
    } else {
        callback()
    }
}
export {validateEmail};
// 如果只有一个 export default function validateEmail = ...
