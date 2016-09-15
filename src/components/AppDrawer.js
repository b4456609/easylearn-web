import React, { PropTypes } from 'react';
import Drawer from 'material-ui/Drawer';
import List from 'material-ui/List/List';
import ListItem from 'material-ui/List/ListItem';
import Divider from 'material-ui/Divider';
import RaisedButton from 'material-ui/RaisedButton';
import UserDrawer from './UserDrawer';
import {
cyan500,
} from 'material-ui/styles/colors';
import {spacing, typography} from 'material-ui/styles';
import FolderList from './FolderList.js'


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
  }
}

const AppDrawer = ({name, folder, showDialog}) => (
  <Drawer open={true} zDepth={1}>
    <div style={style.appName}>
      EasyLearn
    </div>
    <UserDrawer name={name}/>
    <List>
      <ListItem
        primaryText="新增懶人包"
        />
      <ListItem
        primaryText="刪除懶人包"
        />
    </List>
    <Divider />
    <FolderList folder={folder}/>
    <div style={{width: '100%', textAlign: 'center'}}>
      <RaisedButton
        label="新增資料夾"
        onClick={showDialog}/>
    </div>
  </Drawer>
);

AppDrawer.propTypes = {
  name: PropTypes.string.isRequired,
  folder: PropTypes.array.isRequired
}

export default AppDrawer;
