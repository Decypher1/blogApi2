const mongoose = require('mongoose')
const config = require("../config/config")

function dbConnect(){
    mongoose.connect(config.MONGODB_URL)

    mongoose.connection.on("connected", () => {
        console.log('Mongodb connected successfully')
    })

    mongoose.connection.on("error", (err) => {
        console.log('An error Occured, NOT connected')
        console.log(err)
    })
}

module.exports = dbConnect