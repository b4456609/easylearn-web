import React from 'react';
import mdlUpgrade from '../../../utils/mdlUpgrade.js';

class FolderAction extends React.Component {
  constructor(props) {
    super(props);
  }

  render(){
    return (
      <div id="test">
        <button
          id="appbar-menu-lower-right"
          className="mdl-button mdl-js-button mdl-button--icon"
        >
          <i className="material-icons">more_vert</i>
        </button>
        <ul
          className="mdl-menu mdl-menu--bottom-right mdl-js-menu mdl-js-ripple-effect"
          htmlFor="appbar-menu-lower-right"
        >
          <li className="mdl-menu__item" onClick={() => { this.props.removeFolder(this.props.folderId); }}>
            Remove Folder
          </li>
        </ul>
      </div>
    );
  }
}

FolderAction.propTypes = {
  folderId: React.PropTypes.string,
  removeFolder: React.PropTypes.func.isRequired,
};

export default mdlUpgrade(FolderAction);
