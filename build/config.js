module.exports = {
    dev: {
        publicPath: 'http://127.0.0.1:8080/',
        proxy: {
            // 后端服务器地址
            '/api': 'http://localhost:3000'
        }
    },
    prod: {
        output: {
            // js 输出路径
            filename: '[name].js',
            // 线上服务器地址
            publicPath: 'http://127.0.0.1:8080/'
        },
        // html 输出路径
        htmlOutputPath: folder => `${folder.name}.html`,
        // css 输出路径
        cssOutputPath: '[name].css',
        // 图片输出路径
        imgOutputPath: '[name].[hash:7].[ext]'
    }
}