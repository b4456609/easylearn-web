import { browserHistory } from 'react-router';
import React from 'react';
import mdlUpgrade from '../../../utils/mdlUpgrade.js';

const PackAction = ({ versionId, packId, showListVersionDialog }) => (
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
          browserHistory.push(`/pack/${packId}/${versionId}/edit`);
        }}
      >
        新增版本
      </li>
      <li
        className="mdl-menu__item"
        onClick={showListVersionDialog}
      >
        查看其他版本
      </li>
    </ul>
  </div>
);

PackAction.propTypes = {
  versionId: React.PropTypes.string,
  packId: React.PropTypes.string.isRequired,
  showListVersionDialog: React.PropTypes.func.isRequired,
};

export default mdlUpgrade(PackAction);
