import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { StoreContext } from 'storeon/react';

import App from './App';
import store from './store';

ReactDOM.render(
  <React.StrictMode>
    <StoreContext.Provider value={store}>
      <Router>
        <App />
      </Router>
    </StoreContext.Provider>
  </React.StrictMode>,
  document.getElementById('root'),
);
