const MiniCssExtractCss = require('mini-css-extract-plugin')
const { smart } = require('webpack-merge')
const base = require('./webpack.base.js')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { getPluginConfigs } = require('./utils')
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin')
const UglifyjsWebpackPlugin = require('uglifyjs-webpack-plugin')
const { prod } = require('./config')

module.exports = smart(base, {
    mode: 'production',
    output: prod.output,
    // 优化项
    optimization: {
        // 分割代码块，针对多入口
        splitChunks: {
            // 缓存组
            cacheGroups: {
                // 公共模块
                common: {
                    name: 'common',
                    // 大于多少抽离
                    minSize: 0,
                    // 使用多少次以上抽离抽离
                    minChunks: 2,
                    // 从什么地方开始,刚开始
                    chunks: 'initial'
                },
                // 第三方模块
                vendor: {
                    name: 'vendor',
                    // 增加权重,先抽离第三方
                    priority: 1,
                    test: /node_modules/,
                    // 大于多少抽离
                    minSize: 0,
                    // 使用多少次以上抽离抽离
                    minChunks: 1,
                    // 从什么地方开始,刚开始
                    chunks: 'initial'
                }
            }
        },
        minimizer: [
            new UglifyjsWebpackPlugin({
                cache: true,
                parallel: true,
                sourceMap: true
            }),
            new OptimizeCssAssetsWebpackPlugin()
        ]
    },
    module: {
        rules: [
            {
                test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                loader: 'url-loader',
                query: {
                    limit: 10000,
                    name: prod.imgOutputPath
                }
            },
        ]
    },
    plugins: getPluginConfigs(folder => {
        return [
            new HtmlWebpackPlugin({
                template: `${folder.path}/${folder.name}.html`,
                // 输出的hmtl路径
                filename: prod.htmlOutputPath(folder),
                chunks: [`${folder.name}`, 'vendor', 'common'],
                minify: {
                    // 去除空格换行
                    collapseWhitespace: true,
                    // 去除注释
                    removeComments: true,
                    // 删除冗余属性
                    removeRedundantAttributes: true,
                    // 去除脚本类型标签
                    removeScriptTypeAttributes: true,
                    // 去除样式类型
                    removeStyleLinkTypeAttributes: true,
                    // 使用短文件形式
                    useShortDoctype: true
                }
                // hash: true
            })
        ]
    })
    .concat([
        new MiniCssExtractCss({
            filename: prod.cssOutputPath
        })
    ])
})