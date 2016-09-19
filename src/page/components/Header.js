import React from 'react';


const Header = ({ title, removeFolder }) => (
  <header className="mdl-layout__header">
    <div className="mdl-layout__header-row">
      <span className="mdl-layout-title">{title || 'Easylearn'}</span>
      <div className="mdl-layout-spacer" />
      <div>
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
          <li className="mdl-menu__item" onClick={removeFolder}>
            Remove Folder
          </li>
        </ul>
      </div>
    </div>
  </header>
);

Header.propTypes = {
  title: React.PropTypes.string,
  removeFolder: React.PropTypes.func.isRequired,
};

export default Header;
