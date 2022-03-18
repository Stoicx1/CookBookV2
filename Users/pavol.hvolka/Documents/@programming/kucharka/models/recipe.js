const mongoose = require('mongoose')
const {Schema} = mongoose
const {ObjectId} = Schema

const recipeSchema = new mongoose.Schema({
    name: String,
    subname: String,
    image: String,
    duration: Number,
    difficulty: String,
    describtion: String,
    materials: 
        [{
            amount: String,
            ingredient: {type: ObjectId,ref: 'Material'}
        }]
})

module.exports = mongoose.model('Recipe', recipeSchema)
