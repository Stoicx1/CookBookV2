const mongoose = require('mongoose')

const recipeSchema = new mongoose.Schema({
    name: String,
    subname: String,
    image: String,
    duration: Number,
    difficulty: String,
    describtion: String,
    materials: Array
})

module.exports = mongoose.model('Recipe', recipeSchema)
