const express = require('express')
const mongoose = require('mongoose')
const modelRecipe = require('../../models/recipe')

const findRecipe = express()

findRecipe.get('/find-recipe/:Param1', (req, res) => {
    const query = req.query.material
    const param = req.params.Param1
    console.log(query)
    console.log(param)
    //modelRecipe.find({name: param}, function(err, foundMaterials) {
    modelRecipe.find( { 'materials.matName': {$regex: param }}, function(err, foundMaterials) {
        if (!err) {
            console.log('Succesfully returned all materials')
            res.send(foundMaterials)
        } else {
            res.send(err)
        }
    })
})

module.exports = findRecipe