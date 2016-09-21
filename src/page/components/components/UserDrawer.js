import React, { PropTypes } from 'react';
import { fbLogout } from '../../../api/fb';


const UserDrawer = ({ name, id, userLogout }) => (
  <div className="demo-list-action mdl-list">
    <div className="mdl-list__item">
      <span className="mdl-list__item-primary-content">
        <img className="mdl-list__item-avatar" src={`//graph.facebook.com/${id}/picture`} alt={name} />
        <span>{name}</span>
      </span>
        <a
          className="mdl-list__item-action"
          href="#"
        >
          <i className="material-icons">directions_run</i>
        </a>
    </div>
  </div>
);

UserDrawer.propTypes = {
  name: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  userLogout: PropTypes.func.isRequired,
};

export default UserDrawer;
