const mongoose = require('mongoose')

const recipeSchema = new mongoose.Schema({
    name: String,
    image: String,
    describtion: String
})

module.exports = mongoose.model('Recipe', recipeSchema)
