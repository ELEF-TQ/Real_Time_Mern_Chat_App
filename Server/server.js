const express = require('express');
const path = require('path');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const errorHandler = require('./middlewares/errorHandler');
require('dotenv').config();
const server = require('http').createServer(app);
const io = require('socket.io')(server, {
  cors: {
    origin: "http://localhost:5173",
  }
});

// Middlewares
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true,
}));
app.use(express.json());
app.use(errorHandler);
app.use(bodyParser.urlencoded({ extended: false }));

// Importing routes
const userRoutes = require('./routes/userRoutes');
const authRoutes = require('./routes/authRoutes');
const chatRoutes = require('./routes/chatRoutes');
const messRoutes = require('./routes/messRoutes');

// Database connection
const connectDB = require('./config/ConnectDB');
connectDB().then(() => {
  // Start the server when the database is connected
  startServer();
}).catch((e) => {
  console.log(e);
});

// Routes Handlers
app.use('/api', authRoutes);
app.use('/api/user', userRoutes);
app.use('/api/chat', chatRoutes);
app.use('/api/message', messRoutes);

// Socket io handlers
io.on('connection', (socket) => {
  // Setup
  socket.on('setup', (userData) => {
    socket.join(userData._id);
  });

  // Join
  socket.on("join chat", (room) => {
    socket.join(room);
    console.log('user joined: ' + room);
  });

  // Message
  socket.on('new message', (newMessageReceived) => {
    var chat = newMessageReceived.chat;
    chat.users.forEach(user => {
      if (user === newMessageReceived.sender._id) return;
      socket.in(user).emit('message received', newMessageReceived);
    });
  });

  // Typing
  socket.on('typing', (room) => {
    socket.in(room).emit('typing');
  });
  socket.on('stop typing', (room) => {
    socket.in(room).emit('stop typing');
  });

  // Disconnect
  socket.on('disconnect', () => {
    console.log('USER DISCONNECTED');
  });
});

function startServer() {
  if (process.env.NODE_ENV === 'production') {
    // Serve static files and handle production-specific settings
    const __dirname1 = path.resolve('..');
    app.use(express.static(path.join(__dirname1, '/Client/dist')));
    app.get('*', (req, res) => {
      res.sendFile(path.join(__dirname1, 'Client', 'dist', 'index.html'));
    });
  }

  // Start the Express server
  server.listen(5000, () => {
    console.log('Server is listening on port 5000');
  });
}
