const express = require('express');
const { data } = require('./data/data');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const errorHandler = require('./middlewares/errorHandler');
require('dotenv').config();
const server = require('http').createServer(app); 

//______Libraries :
const io = require('socket.io')(server, {
  cors: {
    origin: "http://localhost:5173", 
  }
});
app.use(
    cors({
      origin: "http://localhost:5173", 
      credentials: true, 
    })
  );
  
app.use(express.json());
app.use(errorHandler);
app.use(bodyParser.urlencoded({ extended: false }));

//______importing routes :
const userRoutes = require('./routes/userRoutes');
const authRoutes = require('./routes/authRoutes');
const chatRoutes = require('./routes/chatRoutes');
const messRoutes = require('./routes/messRoutes');


//______Database connection :
const connectDB = require('./config/ConnectDB');
const { log } = require('console');
connectDB().then(() => {
  server.listen(5000, () => {
      console.log('Server is listening on port 5000');
  });
}).catch((e) => {
  console.log(e);
});

//______Routes Handlers :
app.use('/api',authRoutes);
app.use('/api/user',userRoutes);
app.use('/api/chat',chatRoutes);
app.use('/api/message',messRoutes);

//______Socket io handlers :


io.on('connection', (socket) => {
  console.log(`A user connected with socket ID ${socket.id}`);
  socket.on('setup', (userData) => {
    console.log('Received setup event with user data:', userData);
    socket.join(userData._id);
    socket.emit('connected');
    console.log(`Emitted 'connected' event to socket ID ${socket.id}`);
  });
});
