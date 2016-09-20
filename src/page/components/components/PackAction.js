import React from 'react';
import mdlUpgrade from '../../../utils/mdlUpgrade.js';
import { browserHistory } from 'react-router';

class PackAction extends React.Component {
  render() {
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
          <li
            className="mdl-menu__item"
            onClick={() => {
              browserHistory.push(`/pack/${this.props.packId}/${this.props.versionId}/edit`);
            }}
          >
            新增版本
          </li>
          <li
            className="mdl-menu__item"
            onClick={() => {
            }}
          >
            查看其他版本
          </li>
        </ul>
      </div>
    );
  }
}

PackAction.propTypes = {
  versionId: React.PropTypes.string.isRequired,
  packId: React.PropTypes.string.isRequired,
};

export default mdlUpgrade(PackAction);
