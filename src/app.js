var express = require('express')
var app = express()
var http = require('http').createServer(app)
var findServerStatus = require('./index')


var port = process.env.PORT

findServerStatus.findServer


http.listen(port, () => {
    console.log(`connection successfull at port ${port}`)
})