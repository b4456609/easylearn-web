import React from 'react';
import ReactDOM from 'react-dom';
import injectTapEventPlugin from 'react-tap-event-plugin';
import './index.css';

import reducer from './reducers';
import { applyMiddleware, createStore } from 'redux';
import { Provider } from 'react-redux';
import createLogger from 'redux-logger';
import thunk from 'redux-thunk';

import { Router, Route, browserHistory, IndexRedirect } from 'react-router';
import App from './App';
import GetStart from './page/GetStart';
import Home from './page/Home';
import NewPack from './page/NewPack';
import FolderView from './page/FolderView';
import Pack from './page/Pack';

injectTapEventPlugin();

const logger = createLogger();

const debugMidware = [];
if (process.env.NODE_ENV !== 'production') {
  debugMidware.push(window.devToolsExtension && window.devToolsExtension());
  debugMidware.push(applyMiddleware(thunk, logger));
}
else{
  debugMidware.push(applyMiddleware(logger));
}

const store = createStore(reducer, ...debugMidware);

ReactDOM.render(
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/" component={App} >
        <Route path="start" component={GetStart} />
        <IndexRedirect to="/folder/all" />
        <Route component={Home} >
          <Route path="new-pack" component={NewPack} />
          <Route path="pack/:id" component={Pack} />
          <Route path="folder/:id" component={FolderView} />
        </Route>
      </Route>
    </Router>
  </Provider>, document.getElementById('root'));
