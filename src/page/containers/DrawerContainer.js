import { connect } from 'react-redux';
import { showDialog, notLogin } from '../../actions';
import AppDrawer from '../components/AppDrawer';


function mapStateToProps(state) {
  return {
    name: state.user.name,
    id: state.user.id,
    folder: state.folder,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    showDialog: () => {
      dispatch(showDialog('NEW_FOLDER_DIALOG'));
    },
    userLogout: () => {
      localStorage.clear();
      dispatch(notLogin());
    },
  };
}


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AppDrawer);
