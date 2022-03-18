const express = require('express')
const mongoose = require('mongoose')
const modelMaterial = require('../../models/material')

const getMaterial = express()

getMaterial.get('/get-material', (req, res) => {
    modelMaterial.find({}, function(err, materials) {
        if (!err) {
            console.log('Succesfully returned all materials')
            res.send(materials)
        } else {
            res.send(err)
        }
    })
})

module.exports = getMaterial