import { combineReducers } from 'redux'
import user from './user'
import folder from './folder'
import dialog from './dialog'

const App = combineReducers({
  user,
  folder,
  dialog
})

export default App
