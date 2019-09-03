const MiniCssExtractCss = require('mini-css-extract-plugin')
const { smart } = require('webpack-merge')
const base = require('./webpack.base.js')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { getPluginConfigs } = require('./utils')
const { dev } = require('./config')

module.exports = smart(base, {
    mode: 'development',
    output: {
        filename: '[name].js',
        publicPath: dev.publicPath
    },
    devServer: {
        host: '0.0.0.0',
        port: 8080,
        progress: true,
        open: false,
        // contentBase: path.resolve(__dirname, 'dist')
        // 配置一个反向代理
        proxy: dev.proxy
    },
    plugins: getPluginConfigs(folder => {
        return [
            new HtmlWebpackPlugin({
                template: `${folder.path}/${folder.name}.html`,
                // 输出的hmtl路径
                filename: `${folder.name}.html`,
                // 要引入的 chunks
                chunks: [`${folder.name}`]
                // hash: true
            })
        ]
    })
    .concat([
        new MiniCssExtractCss({
            filename: '[name].css'
        })
    ])
})