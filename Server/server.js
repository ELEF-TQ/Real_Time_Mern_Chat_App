const express = require('express');
const { data } = require('./data/data');
const app = express();
require('dotenv').config();

const connectDB = require('./config/ConnectDB');


connectDB().then(() => {
        app.listen(5000, console.log('listening on port 5000' ));
    }).catch((e) => {
        console.log(e);
    })


app.get('/', (req,res)=> {
  res.send('Welcome');
});

app.get('/api/data' , (req, res)=> {
  res.send(data);
})

