const mongoose = require('mongoose')
const {Schema} = mongoose

const materialSchema = new mongoose.Schema({
    name: String
})

module.exports = mongoose.model('Material', materialSchema)
