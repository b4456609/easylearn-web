import React, { PropTypes } from 'react';
import FolderList from './components/FolderList';
import UserDrawer from './components/UserDrawer';
import NewButton from './components/NewButton';

const AppDrawer = ({ name, id, userLogout, showDialog, folder }) => (
  <div className="mdl-layout__drawer">
    <span className="mdl-layout-title">Easylearn</span>
    <UserDrawer name={name} id={id} userLogout={userLogout} />
    <NewButton showDialog={showDialog} />
    <FolderList folder={folder} />
  </div>
);

AppDrawer.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  folder: PropTypes.array.isRequired,
  showDialog: PropTypes.func.isRequired,
  userLogout: PropTypes.func.isRequired,
};

export default AppDrawer;
