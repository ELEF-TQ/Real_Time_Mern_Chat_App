const mongoose = require("mongoose");
const uri = "mongodb+srv://admin:admin@chatapp.ktbpofq.mongodb.net/?retryWrites=true&w=majority&ssl=true";
const connectDB = async () => {
  try {
    const connect = await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(`MongoDB Connected: ${connect.connection.host}, ${connect.connection.name}`);
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
};

module.exports = connectDB;
