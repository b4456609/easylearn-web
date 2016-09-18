import {
  cyan500,
} from 'material-ui/styles/colors';
import { spacing, typography } from 'material-ui/styles';
import React, { PropTypes } from 'react';
import { browserHistory } from 'react-router';
import FolderList from './components/FolderList';
import UserDrawer from './components/UserDrawer';
import NewButton from './components/NewButton';

class AppDrawer extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="mdl-layout__drawer">
        <span className="mdl-layout-title">Easylearn</span>
        <UserDrawer name={this.props.name} id={this.props.id} userLogout={this.props.userLogout} />
        <NewButton showDialog={this.props.showDialog}/>
        <FolderList folder={this.props.folder} />
      </div>
    );
  }
}

AppDrawer.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  folder: PropTypes.array.isRequired,
  showDialog: PropTypes.func.isRequired,
  userLogout: PropTypes.func.isRequired,
};

export default AppDrawer;
