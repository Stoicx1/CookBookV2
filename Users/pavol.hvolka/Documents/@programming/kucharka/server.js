const express = require('express');
const cors = require('cors')
const app = express();
const PORT = process.env.PORT || 5000;
const dbConnect = require('./database/connect')
const getMaterials = require('./routes/GET/getMaterial')
const getByIdMaterials = require('./routes/GET/getByIdMaterial')
const findMaterial = require('./routes/GET/findMaterial')
const saveMaterial = require('./routes/POST/saveMaterial')
const deleteMaterial = require('./routes/DELETE/deleteMaterial')

dbConnect.connectToMongoDB()

app.use(express.json())

app.use('/', cors(), getMaterials)
app.use('/', findMaterial)
app.use('/', saveMaterial)
app.use('/', deleteMaterial)
app.use('/', getByIdMaterials)


app.get('/', (request, response) => {
    response.send('Hlavny stranka');
})

app.listen(PORT, (error) => {
    console.log(`Server bezi na ${PORT}`)
});