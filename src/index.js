import React from 'react';
import ReactDOM from 'react-dom';
import injectTapEventPlugin from 'react-tap-event-plugin';
import './index.css';

import reducer from './reducers';
import { applyMiddleware, createStore } from 'redux';
import { Provider } from 'react-redux';
import createLogger from 'redux-logger';
import thunk from 'redux-thunk';

import { Router, Route, browserHistory, IndexRoute } from 'react-router';
import App from './App';
import NewPack from './page/NewPack';
import FolderView from './page/FolderView';
import Pack from './page/Pack';
import EditPack from './page/EditPack';

injectTapEventPlugin();

const logger = createLogger();

const debugMidware = [];
if (process.env.NODE_ENV !== 'production') {
  debugMidware.push(window.devToolsExtension && window.devToolsExtension());
}

debugMidware.push(applyMiddleware(thunk, logger));

const store = createStore(reducer, ...debugMidware);

ReactDOM.render(
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/" component={App} >
        <IndexRoute component={FolderView} />
        <Route path="pack/:id" component={Pack} />
        <Route path="pack/:id/:versionId/edit" component={EditPack} />
        <Route path="pack/:id/:versionId" component={Pack} />
        <Route path="folder/:id" component={FolderView} />
        <Route path="new-pack" component={NewPack} />
      </Route>
    </Router>
  </Provider>, document.getElementById('root'));
