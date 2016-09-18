import {
  cyan500,
} from 'material-ui/styles/colors';
import { spacing, typography } from 'material-ui/styles';
import React, { PropTypes } from 'react';
import Drawer from 'material-ui/Drawer';
import RaisedButton from 'material-ui/RaisedButton';
import Popover from 'material-ui/Popover';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';
import FolderList from './components/FolderList.js';
import UserDrawer from './components/UserDrawer';
import { browserHistory } from 'react-router';


const style = {
  appName: {
    cursor: 'pointer',
    fontSize: '24px',
    lineHeight: `${spacing.desktopKeylineIncrement}px`,
    fontWeight: typography.fontWeightLight,
    backgroundColor: cyan500,
    color: typography.textFullWhite,
    paddingLeft: spacing.desktopGutter,
  },
};

class AppDrawer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      open: false,
    };

    this.handleTouchTap = this.handleTouchTap.bind(this);
    this.handleRequestClose = this.handleRequestClose.bind(this);
  }

  handleTouchTap(event) {
    // This prevents ghost click.
    event.preventDefault();

    this.setState({
      open: true,
      anchorEl: event.currentTarget,
    });
  }

  handleRequestClose() {
    this.setState({
      open: false,
    });
  }

  render() {
    return (
      <Drawer open zDepth={1}>
        <div style={style.appName}>
          EasyLearn
        </div>
        <UserDrawer
          name={this.props.name}
          id={this.props.id}
          userLogout={this.props.userLogout}
        />
        <div style={{ width: '100%', textAlign: 'center', marginTop: '15px' }}>
          <RaisedButton
            onTouchTap={this.handleTouchTap}
            label="新增"
          />
          <Popover
            open={this.state.open}
            anchorEl={this.state.anchorEl}
            anchorOrigin={{ horizontal: 'left', vertical: 'bottom' }}
            targetOrigin={{ horizontal: 'left', vertical: 'top' }}
            onRequestClose={this.handleRequestClose}
          >
            <Menu>
              <MenuItem
                primaryText="新增懶人包"
                onClick={() => {
                  browserHistory.push('/new-pack');
                  this.handleRequestClose();
                }
                }
              />
              <MenuItem
                primaryText="新增資料夾"
                onClick={() => {
                  this.props.showDialog();
                  this.handleRequestClose();
                }}
              />
            </Menu>
          </Popover>
        </div>
        <FolderList folder={this.props.folder} />
      </Drawer>
    );
  }
}

AppDrawer.propTypes = {
  name: PropTypes.string.isRequired,
  folder: PropTypes.array.isRequired,
  showDialog: PropTypes.func.isRequired,
  userLogout: PropTypes.func.isRequired,
};

export default AppDrawer;
