const express = require('express')
const { json } = require('express/lib/response')
const mongoose = require('mongoose')
const modelRecipe = require('../../models/recipe')

const getByIdRecipe = express()

getByIdRecipe.get('/RecipeOverview/:id', (req, res) => {
    
    modelRecipe.findById({_id: req.params.id}, function(err, recipes) {
        if (!err) {
            console.log('xxx')
            res.send(recipes)
        } else {
            res.send(err)
        }
    })
})

module.exports = getByIdRecipe