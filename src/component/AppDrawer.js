import React from 'react';
import Drawer from 'material-ui/Drawer';
import List from 'material-ui/List/List';
import ListItem from 'material-ui/List/ListItem';
import IconButton from 'material-ui/IconButton';
import DirectionsRun from 'material-ui/svg-icons/maps/directions-run';
import Avatar from 'material-ui/Avatar';
import Divider from 'material-ui/Divider';
import Subheader from 'material-ui/Subheader';
import {
cyan500,
white
} from 'material-ui/styles/colors';
import {spacing, typography} from 'material-ui/styles';

const iconButtonElement = (
  <IconButton
    touch={true}
    tooltip="logout"
    tooltipPosition="bottom-center"
  >
    <DirectionsRun color={white}/>
  </IconButton>
);

const style = {
  appName: {
    cursor: 'pointer',
    //.mui-font-style-headline
    fontSize: '24px',
    lineHeight: `${spacing.desktopKeylineIncrement}px`,
    fontWeight: typography.fontWeightLight,
    backgroundColor: cyan500,
    color: typography.textFullWhite,
    paddingLeft: spacing.desktopGutter,
  },
  list:{
    backgroundColor: cyan500,
    color: typography.textFullWhite,
  },
}

const AppDrawer = () => (
  <Drawer open={true} zDepth={1}>
    <div style={style.appName}>
      EasyLearn
    </div>
    <List style={style.list}>
      <ListItem
        disabled={true}
        leftAvatar={<Avatar>A</Avatar>}
        style={style.list}
        rightIconButton={iconButtonElement}
        >
        User
      </ListItem>
    </List>
    <List>
      <ListItem
        primaryText="新增懶人包"
        />
      <ListItem
        primaryText="刪除懶人包"
        />
    </List>
    <Divider />
    <List>
      <Subheader>資料夾</Subheader>
      <ListItem
        primaryText="全部懶人包"
        />
      <ListItem
        primaryText="James Anderson"
        />
    </List>
  </Drawer>
);

export default AppDrawer;
