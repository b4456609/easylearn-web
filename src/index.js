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

let debugMidware=[];
if (process.env.NODE_ENV !== 'production') {
  debugMidware.push(window.devToolsExtension && window.devToolsExtension());
  debugMidware.push(applyMiddleware(logger));
}

const store = createStore(reducer,...debugMidware)

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
