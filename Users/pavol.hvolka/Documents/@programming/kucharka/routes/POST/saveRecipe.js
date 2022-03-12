const express = require('express')
const modelRecipe = require('../../models/recipe')

const saveRecipe = express()

saveRecipe.post('/save-recipe', (req, res) => {
    const recipe = new modelRecipe({
        name: req.body.name,
        image: req.body.image,
        describtion: req.body.describtion
    })
    recipe
        .save()
        .then(result => {
            console.log(result)
            res.status(200).json({
                message: 'Succesfully insterted to DBs',
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

module.exports = saveRecipe