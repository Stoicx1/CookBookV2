const express = require('express')
const mongoose = require('mongoose')
const modelMaterial = require('../../models/material')

const findMaterial = express()

findMaterial.get('/find-materials/:Param1', (req, res) => {
    const query = req.query.material
    const param = req.params.Param1
    console.log(query)
    console.log(param)
    modelMaterial.find({name: param}, function(err, foundMaterials) {
        if (!err) {
            console.log('Succesfully returned all materials')
            res.send(foundMaterials)
        } else {
            res.send(err)
        }
    })
})

module.exports = findMaterial