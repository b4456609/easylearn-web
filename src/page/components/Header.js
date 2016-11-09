import React from 'react';
import FolderAction from './components/FolderAction';
import PackAction from './components/PackAction';

function getAction(removeFolder, folderId, packId, versionId, showListVersionDialog, isEdit) {
  if (isEdit) {
    return null;
  }

  if (folderId !== null && folderId !== 'all') {
    return (
      <FolderAction
        removeFolder={removeFolder}
        folderId={folderId}
      />
    );
  }

  if (packId != null) {
    return (
      <PackAction
        packId={packId}
        versionId={versionId}
        showListVersionDialog={showListVersionDialog}
      />
    );
  }

  return null;
}

const Header = ({ title, removeFolder, folderId, packId, versionId, showListVersionDialog, isEdit }) => {
  return (
    <header className="mdl-layout__header">
      <div className="mdl-layout__header-row">
        <span className="mdl-layout-title">{title || 'Easylearn'}</span>
        <div className="mdl-layout-spacer" />
        {getAction(removeFolder, folderId, packId, versionId, showListVersionDialog, isEdit)}
      </div>
    </header>
  );
};

Header.propTypes = {
  isEdit: React.PropTypes.bool,
  title: React.PropTypes.string,
  packId: React.PropTypes.string,
  folderId: React.PropTypes.string,
  versionId: React.PropTypes.string,
  removeFolder: React.PropTypes.func.isRequired,
  showListVersionDialog: React.PropTypes.func.isRequired,
};

export default Header;
