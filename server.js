var http = require('http')
var url = require('url')
var fs = require('fs')

http.createServer(function (request, response) {
    var requestUrl = url.parse(request.url)    
    response.writeHead(200)
    fs.createReadStream('dapp-poc/index.html').pipe(response)  // do NOT use fs's sync methods ANYWHERE on production (e.g readFileSync) 
}).listen(9000)   