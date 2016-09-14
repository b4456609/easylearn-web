import { combineReducers } from 'redux'
import user from './user'
import folder from './folder'

const App = combineReducers({
  user,
  folder
})

export default App
