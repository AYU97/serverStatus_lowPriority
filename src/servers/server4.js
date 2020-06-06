var express = require('express')
var app = express()


app.get('/',(req,res)=>{
    setTimeout(()=>{
        res.status(200).send()
    ,5000})
    })

module.exports =app