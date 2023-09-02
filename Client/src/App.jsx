import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import ChatPage from './pages/ChatPage';



function App() {


  return (
    <div className='App'>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/Chat' element={<ChatPage/>} />
      </Routes>
    </div>
  );
}

export default App;
