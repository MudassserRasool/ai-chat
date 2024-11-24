import React from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Chat from './pages/Chat/Chat';
const App = () => {
  return (
    <div className="bg-[#212121]">
      <ToastContainer />
      <Chat />
    </div>
  );
};

export default App;
