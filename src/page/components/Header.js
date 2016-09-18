import React from 'react';


const Header = ({ title }) => (
  <header className="mdl-layout__header">
    <div className="mdl-layout__header-row">
      <span className="mdl-layout-title">{title || 'All'}</span>
      <div className="mdl-layout-spacer" />
    </div>
  </header>
);

Header.propTypes = {
  title: React.PropTypes.string,
};

export default Header;
