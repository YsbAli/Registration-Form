
const mongoose = require("mongoose")
require("dotenv").config()
const URL = process.env.MONGODB_URL

module.exports = () => {
    try {
        return mongoose.connect(URL)
    }
    catch (err) {
        return { "Message": err.Message }
    }
}

