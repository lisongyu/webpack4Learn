var glob = require('glob')
var path = require('path')

var PAGES_DIR = path.resolve(__dirname, '../src/pages')

exports.entries = function () {
    var entryFiles = glob.sync(PAGES_DIR + '/**.js')
    var resultEntry = {}
    console.log(entryFiles)
   console.log('我是这个吗')
    entryFiles.forEach(filePath => {
        console.log(filePath)
        var filename = filePath.substring(filePath.lastIndexOf('\/') + 1, filePath.lastIndexOf('.'))
        resultEntry[filename] = filePath
    })
    return resultEntry
}