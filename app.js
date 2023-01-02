const express = require('express')
const bodyParser = require('body-parser')
const config = require("./config/config")
const dbConnect = require("./db/mongodb")

const app = express()

//connecting to mongo database

dbConnect()

//Middleware
app.use(bodyParser.urlencoded({ extended : false}))
app.use(bodyParser.json())

app.get("/", (req, res) => {
    res.send("Welcome to my blog")
})

app.listen(config.PORT, () => {
    console.log(`Server is running on http://localhost:${config.PORT}`)
})