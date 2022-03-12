const express = require('express')
const { json } = require('express/lib/response')
const mongoose = require('mongoose')
const modelMaterial = require('../../models/material')

const getByIdMaterials = express()

getByIdMaterials.get('/RecipeOverview/:id', (req, res) => {
    
    modelMaterial.findById({_id: req.params.id}, function(err, materials) {
        if (!err) {
            console.log('xxx')
            res.send(materials)
        } else {
            res.send(err)
        }
    })
})



module.exports = getByIdMaterials