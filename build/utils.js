const glob = require('glob')
const path = require('path')

const globPath = path.join(__dirname, '../src/views/*')

console.log(globPath)

// 获取入口
function getEntry() {
    let entrys = {}
    glob.sync(globPath)
    .forEach(folderPath => {
        let arr = folderPath.split('/')
        let folder = {
            name: arr[arr.length - 1],
            path: folderPath
        }
        entrys[folder.name] = `${folder.path}/${folder.name}.js`
    })
    console.log(entrys)
    return entrys
}

// 插件配置助手
function getPluginConfigs(callback) {
    let pluginConfig = []
    glob.sync(globPath)
    .forEach(folderPath => {
        let arr = folderPath.split('/')
        callback({
            name: arr[arr.length - 1],
            path: folderPath
        })
        .forEach(confTemp => {
            pluginConfig.push(confTemp)
        })
    })
    console.log(pluginConfig)
    return pluginConfig
}

module.exports = {
    getPluginConfigs,
    getEntry
}