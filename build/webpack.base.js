const { getEntry } = require('./utils')
const MiniCssExtractCss = require('mini-css-extract-plugin')
const path = require('path')

module.exports = {
    entry: getEntry(),

    module: {
        rules: [
            {
                test: /\.js$/,
                use: 'babel-loader'
            },
            {
                test: /\.css$/,
                use: [MiniCssExtractCss.loader, 'css-loader']
            },
            {
                test: /\.less$/,
                use: [MiniCssExtractCss.loader, 'css-loader', 'less-loader']
            }
        ]
    },

    resolve: {
        alias: {
          vue: 'vue/dist/vue.js',
          '@src': path.resolve('../src')
        }
    }
}