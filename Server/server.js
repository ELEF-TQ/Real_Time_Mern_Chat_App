const express = require('express');
const { data } = require('./data/data');
const app = express();
const cors = require('cors');
const errorHandler = require('./middlewares/errorHandler');
require('dotenv').config();

//______Libraries :
app.use(cors());
app.use(express.json());
app.use(errorHandler);

//______importing routes :
const userRoutes =  require('./routes/userRoutes');
const authRoutes = require('./routes/authRoutes');
const chatRoutes = require('./routes/chatRoutes');



//______Database connection :
// const connectDB = require('./config/ConnectDB');
// connectDB().then(() => {
//         app.listen(5000, console.log('listening on port 5000' ));
//     }).catch((e) => {
//         console.log(e);
//     })

//______Routes Handlers :
app.use('/api',authRoutes);
app.use('/api/user',userRoutes);
app.use('api/chat',chatRoutes);
app.listen(5000, console.log('listening on port 5000' ));



