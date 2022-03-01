const express = require('express');
const app = express();
const PORT = process.env.PORT || 5000;
const dbConnect = require('./database/connect')

dbConnect.connectToMongoDB()

app.get('/', (request, response) => {
    response.send('Hlavny stranka');
})

app.listen(PORT, (error) => {
    console.log(`Server bezi na ${PORT}`)
});