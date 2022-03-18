const express = require('express')
const { json } = require('express/lib/response')
const mongoose = require('mongoose')
const modelRecipe = require('../../models/recipe')

const getRecipeById = express()

getRecipeById.get('/RecipeOverview/:id', (req, res) => {
    
    // modelRecipe.findById({_id: req.params.id}, function(err, recipes) {
    //     if (!err) {
    //         console.log(`showing recipe ${recipes._id}`)
    //         res.send(recipes)
    //     } else {
    //         res.send(err)
    //     }
    // })

    modelRecipe.findById({_id: req.params.id})
    .populate('materials.ingredient') 
    .exec( (err, recipe) => {
        res.send(recipe)
    })
})

module.exports = getRecipeById