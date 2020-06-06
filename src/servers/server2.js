var express = require('express')
var app = express()


app.get('/',(req,res)=>{
    res.status(302).send()
})

module.exports =app