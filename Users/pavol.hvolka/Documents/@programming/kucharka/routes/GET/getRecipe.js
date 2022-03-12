const express = require('express')
const mongoose = require('mongoose')
const modelRecipe = require('../../models/recipe')

const getRecipe = express()

getRecipe.get('/get-recipe', (req, res) => {
    modelRecipe.find({}, function(err, recipes) {
        if (!err) {
            console.log('Succesfully returned all materials')
            res.send(recipes)
        } else {
            res.send(err)
        }
    })
})

module.exports = getRecipe