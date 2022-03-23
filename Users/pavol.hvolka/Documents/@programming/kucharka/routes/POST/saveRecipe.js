const express = require('express')
const modelRecipe = require('../../models/recipe')

const saveRecipe = express()

saveRecipe.post('/save-recipe', (req, res) => {
    const recipe = new modelRecipe({
        name:           req.body.name,
        subname:        req.body.subname,
        image:          req.body.image,
        duration:       req.body.duration,
        like_cnt:       req.body.like_cnt,
        difficulty:     req.body.difficulty,
        describtion:    req.body.describtion,
        materials:      req.body.materials
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