import React from 'react';
import ReactDOM from 'react-dom';
import injectTapEventPlugin from 'react-tap-event-plugin';
import './index.css';

import reducer from './reducers';
import { applyMiddleware, createStore } from 'redux';
import { Provider } from 'react-redux';
import createLogger from 'redux-logger';

import { Router, Route, browserHistory, IndexRoute } from 'react-router';
import App from './App';
import GetStart from './page/GetStart';
import Home from './page/Home';
import NewPack from './page/NewPack';
import FolderView from './page/FolderView';

injectTapEventPlugin();

const logger = createLogger();

const debugMidware = [];
if (process.env.NODE_ENV !== 'production') {
  debugMidware.push(window.devToolsExtension && window.devToolsExtension());
  debugMidware.push(applyMiddleware(logger));
}

const store = createStore(reducer, ...debugMidware);

ReactDOM.render(
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/" component={App} >
        <IndexRoute component={GetStart} />
        <Route path="home/" component={Home} >
          <IndexRoute component={FolderView} />
          <Route path="new-pack" component={NewPack} />
        </Route>
      </Route>
    </Router>
  </Provider>, document.getElementById('root'));
