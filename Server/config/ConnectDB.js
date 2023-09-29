//____HOSTED-DATABASE :
const mongoose = require("mongoose");
const connectDB = async () => {
    try {
        const MONGO_URI = process.env.MONGO_URI; 
        const connect = await mongoose.connect(MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        console.log(`MongoDB Connected: ${connect.connection.host}, ${connect.connection.name}`);
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
    }
};

module.exports = connectDB;

//____LOCAL-DATABASE :

// const connectDB = async () => {
//     try {
//         const connect = await mongoose.connect('mongodb://localhost/CHAT')
//         console.log(`MongoDB Connected: ${connect.connection.host} , ${connect.connection.name}`)
//     }  catch (error) {
//         console.error("Error connecting to MongoDB:", error);
//       }
      
// }

// module.exports = connectDB;
