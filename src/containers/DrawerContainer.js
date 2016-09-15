import { connect } from 'react-redux'
import { showDialog } from '../actions'
import AppDrawer from '../components/AppDrawer'


const mapStateToProps = (state) => {
  return {
    name: state.user.name,
    folder: state.folder
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    showDialog: () => {
      dispatch(showDialog('NEW_FOLDER_DIALOG', 'adf'))
    }
  }
}


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AppDrawer)
