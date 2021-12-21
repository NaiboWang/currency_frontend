// vue.config.js
const webpack = require('webpack');

module.exports = {
    pages: { //多入口设置
        home: {
            // index页面的入口
            entry: 'src/home.js',
            // index页面模板来源
            template: 'public/home.html',
            // index页面最终打包在dist目录下输出文件名
            filename: 'home.html',
            // 当使用 title 选项时，template 中的 title 标签需要是 <title><%= htmlWebpackPlugin.options.title %></title>
            title: 'Currency Market'
        },
        index: {
            // Entry页面的入口
            entry: 'src/main.js',
            template: 'public/index.html',
            filename: 'index.html',
            title: 'Currency Market'
        },
    },
    devServer:{
      host:"0.0.0.0",
    },
   configureWebpack: {
        devServer: {
            compress: true,
            disableHostCheck: true,   // 允许非localhost访问开发环境
            port:8081,
        },
        plugins: [
            new webpack.ProvidePlugin({
                $: "jquery",
                jQuery: "jquery",
                "windows.jQuery": "jquery"
            })
        ]
    }
}
