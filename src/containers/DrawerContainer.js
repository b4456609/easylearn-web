import { connect } from 'react-redux'
import { loginSuccess,addFolder } from '../actions'
import AppDrawer from '../components/AppDrawer'


const mapStateToProps = (state) => {
  return {
    name: state.user.name,
    folder: state.folder
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onClick: () => {
      dispatch(loginSuccess('test','test'))
    },
    addFolder: () => {
      dispatch(addFolder('a'))
    }
  }
}


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AppDrawer)
