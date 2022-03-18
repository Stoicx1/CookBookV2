const express = require('express')
const modelRecipe = require('../../models/recipe')

const saveRecipe = express()

saveRecipe.post('/save-recipe', (req, res) => {
    const recipe = new modelRecipe({
        name: req.body.name,
        subname: 'subname',
        image: req.body.image,
        duration: 10,
        difficulty: 'Easy',
        describtion: req.body.describtion,
        //materials: [{vodka: '2cl'}, {citron: '1pcs'}]
        materials: req.body.materials
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