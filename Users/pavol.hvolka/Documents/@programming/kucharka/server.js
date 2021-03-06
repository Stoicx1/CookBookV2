const express = require('express');
const cors = require('cors')
const app = express();
const PORT = process.env.PORT || 5000;
const dbConnect = require('./database/connect')
const getRecipe = require('./routes/GET/getRecipe')
const getMaterial = require('./routes/GET/getMaterial')
const getRecipeById = require('./routes/GET/getRecipeById')
const findRecipe = require('./routes/GET/findRecipe')
const findMaterial = require('./routes/GET/findMaterial')
const saveRecipe = require('./routes/POST/saveRecipe')
const saveMaterial = require('./routes/POST/saveMaterial')
const deleteRecipe = require('./routes/DELETE/deleteRecipe');
const deleteMaterial = require('./routes/DELETE/deleteMaterial');
const likeRecipe = require('./routes/PUT/likeRecipe');

dbConnect.connectToMongoDB()

app.use(express.json())

app.use('/', cors(), getRecipe)
app.use('/', findRecipe)
app.use('/', findMaterial)
app.use('/', saveRecipe)
app.use('/', deleteRecipe)
app.use('/', getRecipeById)

app.use('/', saveMaterial)
app.use('/', deleteMaterial)
app.use('/', getMaterial)

app.use('/', likeRecipe)


app.get('/', (request, response) => {
    response.send('Hlavny stranka');
})

app.listen(PORT, (error) => {
    console.log(`Server bezi na ${PORT}`)
});