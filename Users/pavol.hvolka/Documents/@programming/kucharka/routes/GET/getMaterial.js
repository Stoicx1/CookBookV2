const express = require('express')
const mongoose = require('mongoose')
const modelMaterial = require('../../models/material')

const getMaterials = express()

getMaterials.get('/get-materials', (req, res) => {
    modelMaterial.find({}, function(err, materials) {
        if (!err) {
            console.log('Succesfully returned all materials')
            res.send(materials)
        } else {
            res.send(err)
        }
    })
})

module.exports = getMaterials