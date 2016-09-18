import React, { PropTypes } from 'react';
import List from 'material-ui/List/List';
import ListItem from 'material-ui/List/ListItem';
import DirectionsRun from 'material-ui/svg-icons/maps/directions-run';
import Avatar from 'material-ui/Avatar';
import IconButton from 'material-ui/IconButton';
import { typography } from 'material-ui/styles';
import { fbLogout } from '../../../api/fb';

import {
cyan500,
white,
} from 'material-ui/styles/colors';

const style = {
  backgroundColor: cyan500,
  color: typography.textFullWhite,
};

const UserDrawer = ({ name, id, userLogout }) => (
  <List style={style}>
    <ListItem
      disabled
      leftAvatar={
        <Avatar src={`//graph.facebook.com/${id}/picture`} />
      }
      style={style}
      rightIconButton={
        <IconButton
          touch
          tooltip="logout"
          tooltipPosition="bottom-left"
          onClick={() => { fbLogout(userLogout()); }}
        >
        <DirectionsRun color={white} />
        </IconButton>
      }
    >
      {name}
    </ListItem>
  </List>
);

UserDrawer.propTypes = {
  name: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  userLogout: PropTypes.func.isRequired,
};

export default UserDrawer;
