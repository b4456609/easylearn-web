import { combineReducers } from 'redux';
import user from './user';
import folder from './folder';
import dialog from './dialog';
import pack from './pack';

const App = combineReducers({
  user,
  folder,
  dialog,
  pack,
});

export default App;
