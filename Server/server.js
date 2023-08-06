const express = require('express');
const { data } = require('./data/data');
const app = express();
const cors = require('cors');
const errorHandler = require('./middlewares/errorHandler');
require('dotenv').config();


const connectDB = require('./config/ConnectDB');

//______importing routes :
const userRoutes =  require('./routes/userRoutes');

connectDB().then(() => {
        app.listen(5000, console.log('listening on port 5000' ));
    }).catch((e) => {
        console.log(e);
    })

app.use(cors());
app.use(express.json());
app.use('/api/user',userRoutes)

app.get('/', (req, res) => {
  res.send('Welcome'); 
})

//_______Error Handler :
app.use(errorHandler);