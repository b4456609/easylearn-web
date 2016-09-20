import React from 'react';
import FolderAction from './components/FolderAction';

const Header = ({ title, removeFolder, folderId }) => {
  let action = undefined;
  if (folderId !== null && folderId !== 'all') {
    action = <FolderAction removeFolder={removeFolder} fodlerId={folderId} />;
  }
  return (<header className="mdl-layout__header">
    <div className="mdl-layout__header-row">
      <span className="mdl-layout-title">{title || 'Easylearn'}</span>
      <div className="mdl-layout-spacer" />
      {action}
    </div>
  </header>);
};

Header.propTypes = {
  title: React.PropTypes.string,
  folderId: React.PropTypes.string,
  removeFolder: React.PropTypes.func.isRequired,
};

export default Header;
