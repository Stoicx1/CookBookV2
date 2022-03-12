const express = require('express')
const modelRecipe = require('../../models/recipe')
const deleteRecipe = express()

deleteRecipe.delete('/recipe/:id', (req, res) => {
    modelRecipe.findByIdAndDelete({_id: req.params.id})
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

module.exports = deleteRecipe