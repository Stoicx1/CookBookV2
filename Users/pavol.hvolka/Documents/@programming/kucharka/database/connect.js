//Import the mongoose module
const mongoose = require('mongoose');
const dotenv = require('dotenv')

// Setup dotenv
dotenv.config()
const url = process.env.URL;

//Set up default mongoose connection
const connectToDB = () => {
    mongoose.connect(url,{
        useNewUrlParser: true
    }, (err) => {
        if (err) {
            console.log('Some error occured with connection to mongoDB')
        } else {
            console.log('Succesfuly connected to mongoDB')
        }
    }) 
} 

// Exporting methode of this module
// We can call with -> connect.connectToDB()
exports.connectToMongoDB = connectToDB;