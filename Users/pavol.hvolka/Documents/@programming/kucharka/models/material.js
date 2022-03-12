const mongoose = require('mongoose')
const materialSchema = new mongoose.Schema({
    name: String,
    image: String,
    describtion: String
})

module.exports = mongoose.model('Material', materialSchema)
