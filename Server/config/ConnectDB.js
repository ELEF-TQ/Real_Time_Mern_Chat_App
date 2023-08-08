const mongoose = require("mongoose");

const connectDB = async () => {
    try {
        const connect = await mongoose.connect('mongodb://localhost/CHAT')
        console.log(`MongoDB Connected: ${connect.connection.host} , ${connect.connection.name}`)
    }  catch (error) {
        console.error("Error connecting to MongoDB:", error);
      }
      
}

module.exports = connectDB;