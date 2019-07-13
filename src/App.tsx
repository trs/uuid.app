import React from 'react';
import Uuid from './Uuid';
import './App.css';

const App: React.FC = () => {
  return (
    <div className="app">
      <div className="app-container">
        <Uuid />
      </div>
    </div>
  );
}

export default App;
