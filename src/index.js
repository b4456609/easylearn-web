import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import injectTapEventPlugin from 'react-tap-event-plugin';
import './index.css';

import reducer from './reducers'
import { applyMiddleware, createStore } from 'redux'
import { Provider } from 'react-redux'
import createLogger from 'redux-logger';


injectTapEventPlugin();

const logger = createLogger();
const store = createStore(reducer, applyMiddleware(logger))

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
