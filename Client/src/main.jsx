import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import ChatProvider from './context';
import { ChakraProvider } from '@chakra-ui/react';
import { BrowserRouter as Router } from 'react-router-dom';
import './App.css'
ReactDOM.createRoot(document.getElementById('root')).render(

  <Router>
      <ChatProvider>

      <ChakraProvider>
        <App />
      </ChakraProvider>
      </ChatProvider>

    </Router>

);
