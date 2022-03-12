const express = require('express');
const cors = require('cors')
const app = express();
const PORT = process.env.PORT || 5000;
const dbConnect = require('./database/connect')
const getRecipe = require('./routes/GET/getRecipe')
const getByIdRecipe = require('./routes/GET/getByIdRecipe')
const findRecipe = require('./routes/GET/findRecipe')
const saveRecipe = require('./routes/POST/saveRecipe')
const deleteRecipe = require('./routes/DELETE/deleteRecipe')

dbConnect.connectToMongoDB()

app.use(express.json())

app.use('/', cors(), getRecipe)
app.use('/', findRecipe)
app.use('/', saveRecipe)
app.use('/', deleteRecipe)
app.use('/', getByIdRecipe)


app.get('/', (request, response) => {
    response.send('Hlavny stranka');
})

app.listen(PORT, (error) => {
    console.log(`Server bezi na ${PORT}`)
});