const express = require('express')
const modelMaterial = require('../../models/material')

const saveMaterial = express()

saveMaterial.post('/save-material', (req, res) => {
    const mat = new modelMaterial({
        name: req.body.name,
        image: req.body.image,
        describtion: req.body.describtion
    })
    mat
        .save()
        .then(result => {
            console.log(result)
            res.status(200).json({
                message: 'Succesfully insterted to DB',
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