import React from 'react';
import Header from './components/Header/Header';
import Chat from './pages/Chat/Chat';

const App = () => {
  return (
    <div className="bg-[#212121]">
      <Header />
      <Chat />
    </div>
  );
};

export default App;
