const { getEntry } = require('./utils')
const MiniCssExtractCss = require('mini-css-extract-plugin')

module.exports = {
    entry: getEntry(),

    module: {
        rules: [
        {
            test: /\.css$/,
            use: [MiniCssExtractCss.loader, 'css-loader']
        }]
    }
}