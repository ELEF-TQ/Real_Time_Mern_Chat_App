import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import ChatProvider from './Context/ChatProvider';
import { ChakraProvider } from '@chakra-ui/react';
import { BrowserRouter as Router } from 'react-router-dom';

ReactDOM.createRoot(document.getElementById('root')).render(

  <Router>
      <ChatProvider>

      <ChakraProvider>
        <App />
      </ChakraProvider>
      </ChatProvider>

    </Router>

);
