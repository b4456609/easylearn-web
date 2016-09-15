import React, { PropTypes } from 'react';
import List from 'material-ui/List/List';
import ListItem from 'material-ui/List/ListItem';
import DirectionsRun from 'material-ui/svg-icons/maps/directions-run';
import Avatar from 'material-ui/Avatar';
import IconButton from 'material-ui/IconButton';
import {typography} from 'material-ui/styles';

import {
cyan500,
white
} from 'material-ui/styles/colors';

const iconButtonElement = (
  <IconButton
    touch={true}
    tooltip="logout"
    tooltipPosition="bottom-left"
  >
    <DirectionsRun color={white}/>
  </IconButton>
);

const style = {
  backgroundColor: cyan500,
  color: typography.textFullWhite,
}

const UserDrawer = ({name}) => (
  <List style={style}>
    <ListItem
      disabled={true}
      leftAvatar={
        <Avatar>
          {name[0]}
        </Avatar>
      }
      style={style}
      rightIconButton={iconButtonElement}
      >
      {name}
    </ListItem>
  </List>
);

UserDrawer.propTypes = {
  name: PropTypes.string.isRequired
}

export default UserDrawer;
