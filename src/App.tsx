import React from 'react';
import Uuid from './Uuid';
import Api from './Api';
import NotFound from './NotFound';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCode } from '@fortawesome/free-solid-svg-icons';
import { faGithubAlt } from '@fortawesome/free-brands-svg-icons';
import './App.css';

const Page: React.FC = () => {
  switch (window.location.pathname) {
    case '/api':
    case '/api/': return <Api />;
    case '/': return <Uuid />;
    default: return <NotFound />;
  }
};

const App: React.FC = () => {
  return (
    <div className="app">
      <div className="app-container">
        <Page />
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
