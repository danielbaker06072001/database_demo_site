const express = require('express')
const db = require('./database')
var cors = require ('cors')
const bodyParser = require('body-parser')


const addRoute = require('./routes/add')


const app = express()
const port = 3213


app.use(express.urlencoded({extended : false}))
app.use(express.json())
app.use(cors())
app.options("*", cors())

app.use('/add/', addRoute)

app.listen(port, ()=> console.log(`Example app listening on port ${port}`));
