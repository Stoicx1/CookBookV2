const express = require('express')
const router = express.Router()
const modelMaterial = require('../../models/material')
const deleteMaterial = express()

deleteMaterial.delete('/material/:id', (req, res) => {
    modelMaterial.findByIdAndDelete({_id: req.params.id})
        .then(result => {
            console.log(result)
            res.status(200).json({
                message: `Succesfully deleted from DB ${req.params.id}`,
                deletedData: result
            })
            
        })
        .catch((err) => {
            console.log(err)
            res.status(500).json({
                error: err
            })
        })
        
})

module.exports = deleteMaterial