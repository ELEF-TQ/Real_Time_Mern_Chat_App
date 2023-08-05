const express = require('express');
const { data } = require('./data/data');
const app = express();




app.get('/', (req,res)=> {
  res.send('Welcome');
});

app.get('/api/data' , (req, res)=> {
  res.send(data);
})

app.listen(5000, ()=> {
  console.log('listening on port 5000');
})