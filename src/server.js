var express = require('express')
var app = express()
var server1 = require('./servers/server1')
var server2 = require('./servers/server2')
var server3 = require('./servers/server3')
var server4 = require('./servers/server4')


var http = require('http').createServer(app)

var port1 = process.env.PORT1
var port2 = process.env.PORT2
var port3 = process.env.PORT3
var port4 = process.env.PORT4

server1.listen(port1, () => {
    console.log(`connection successfull at port ${port1}`)
})



server2.listen(port2, () => {
    console.log(`connection successfull at port ${port2}`)
})



server3.listen(port3, () => {
    console.log(`connection successfull at port ${port3}`)
})


server4.listen(port4, () => {
    console.log(`connection successfull at port ${port4}`)
})
