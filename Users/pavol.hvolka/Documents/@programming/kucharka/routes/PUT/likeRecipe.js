const express = require('express')
const recipe = require('../../models/recipe')
const modelRecipe = require('../../models/recipe')

const likeRecipe = express()

likeRecipe.post('/like-recipe/:id', (req, res) => {
    console.log(`Liking recipe ${req.params.id}`)
    let like_cnt = req.body 
    console.log(typeof(req.body))
    modelRecipe.findByIdAndUpdate( req.params.id, {'like_cnt':like_cnt.like_cnt}, function (err, data) {
        if (err) {
            console.log(err)
        } else {
            console.log(like_cnt)
        }
    })

    return (
        res.send({
            msg: `Recipe ${req.params.id} has been liked`
        })
    )
})

module.exports = likeRecipe