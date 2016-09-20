import React from 'react';
import FolderAction from './components/FolderAction';
import PackAction from './components/PackAction';

const Header = ({ title, removeFolder, folderId, packId }) => {
  let action = undefined;
  if (folderId !== null && folderId !== 'all') {
    action = <FolderAction removeFolder={removeFolder} folderId={folderId} />;
  }
  else if (packId != null) {
    action = <PackAction />
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
  packId: React.PropTypes.string,
  folderId: React.PropTypes.string,
  removeFolder: React.PropTypes.func.isRequired,
};

export default Header;
