const express = require('express')
const modelMaterial = require('../../models/material')

const saveMaterial = express()

saveMaterial.post('/save-material', (req, res) => {
    const material = new modelMaterial({
        name: req.body.name
    })
    material
        .save()
        .then(result => {
            console.log(result)
            res.status(200).json({
                message: 'Material succesfully insterted to DBs',
                createdProduct: result
            })
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({
                error: err,
            })
        })
})

module.exports = saveMaterial