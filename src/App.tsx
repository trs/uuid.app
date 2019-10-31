import React from 'react';
import Uuid from './Uuid';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCode } from '@fortawesome/free-solid-svg-icons';
import { faGithubAlt } from '@fortawesome/free-brands-svg-icons';
import './App.css';

const App: React.FC = () => {
  return (
    <div className="app">
      <div className="app-container">
        <Uuid />
      </div>
      <div className="footer">
        <a href="/api" rel="noopener noreferrer">
          <FontAwesomeIcon icon={faCode} />
        </a>
        <a href="https://github.com/trs/getuuid" target="_blank" rel="noopener noreferrer">
          <FontAwesomeIcon icon={faGithubAlt} />
        </a>
      </div>
    </div>
  );
}

export default App;
