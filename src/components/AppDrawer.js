import React, { PropTypes } from 'react';
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

const AppDrawer = ({onClick, name, folder, addFolder}) => (
  <Drawer open={true} zDepth={1}>
    <div style={style.appName}>
      EasyLearn
    </div>
    <List style={style.list}>
      <ListItem
        disabled={true}
        leftAvatar={<Avatar>{name[0]}</Avatar>}
        style={style.list}
        rightIconButton={iconButtonElement}
        >
        {name}
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
      {folder.map(
        item => <ListItem
        key={item.id}
        primaryText={item.name}
        />
      )
      }
      <ListItem
        primaryText="James Anderson"
        onClick={onClick}
        />
      <ListItem
        primaryText="James Anderson"
        onClick={addFolder}
        />
    </List>
  </Drawer>
);

AppDrawer.propTypes = {
  onClick: PropTypes.func.isRequired,
  addFolder: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  folder: PropTypes.array.isRequired
}

export default AppDrawer;
