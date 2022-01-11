// 所有生产环境
const prodPlugin = []

if (process.env.NODE_ENV === 'production') {

  // 如果是生产环境，则自动清理掉打印的日志，但保留error 与 warn
  prodPlugin.push([
    'transform-remove-console',
    {
      // 保留 console.error 与 console.warn
      exclude: ['error', 'warn']
    }
  ])
}


module.exports = {
  presets: [
    '@vue/cli-plugin-babel/preset'
  ],
  plugins: [
    ...prodPlugin
  ]
}
//babel是将es6以上版本的代码转换为浏览器能识别的es5版本的代码，这里的presets是指vue预设的babel的转换方式，负责将vue代码转换为js代码
