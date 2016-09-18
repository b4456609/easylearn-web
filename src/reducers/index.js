import { combineReducers } from 'redux';
import user from './user';
import folder from './folder';
import dialog from './dialog';
import pack from './pack';
import app from './app';

const App = combineReducers({
  user,
  folder,
  dialog,
  pack,
  app,
});

export default App;
