let React = require('react');
let {
  Navigation,
  State
} = require('react-router');
let EasyLearnActions = require('../action/easylearn-actions.jsx');
let DirectionsWalk = require('../svg-icons/directions-walk');
let FolderStore = require('../stores/folder-store.jsx');
let UserStore = require('../stores/user-store.jsx');
let {
  LeftNav,
  IconButton,
  Styles,
  MenuItem,
  Mixins,
  ClearFix,
  Avatar
} = require('material-ui');

let {
  Typography,
  Spacing,
  Colors
} = Styles;

let {
  StylePropable,
  StyleResizable
} = Mixins;

function getState() {
  return {
    userId: UserStore.getUserId(),
    username: UserStore.getUserName(),
    folder: FolderStore.getFolderMenu()
  }
}

let AppLeftNav = React.createClass({
  mixins: [
    StylePropable, StyleResizable, Navigation, State
  ],

  getInitialState: function() {
    return {
      folder: [],
      userId: UserStore.getUserId(),
      username: UserStore.getUserName(),
      docked: true
    };
  },

  componentDidMount: function() {
    let self = this;
    window.addEventListener("resize", function() {
      self.determinOpenOrClose();
    });

    if (window.innerWidth < 900) {
      this.refs.leftNav.close();
      this.refs.leftNav.toggle();
    }
    FolderStore.addChangeListener(this._onChange);
    UserStore.addChangeListener(this._onChange);

  },

  componentWillUnmount: function() {
    FolderStore.removeChangeListener(this._onChange);
    UserStore.addChangeListener(this._onChange);
  },

  _onChange: function() {
    this.setState(getState());
  },

  determinOpenOrClose() {
    if (this.isDeviceSize(StyleResizable.statics.Sizes.LARGE)) {
      this.refs.leftNav.close();
      this.refs.leftNav.toggle();
      this.setState({
        docked: true
      });
    } else {
      this.refs.leftNav.close();
      this.setState({
        docked: false
      });
    }
  },
  getStyles() {
    return {
      appName: {
        cursor: 'pointer',
//.mui-font-style-headline
        fontSize: '24px',
        color: Typography.textFullWhite,
        lineHeight: Spacing.desktopKeylineIncrement + 'px',
        fontWeight: Typography.fontWeightLight,
        backgroundColor: Colors.teal500,
        paddingLeft: Spacing.desktopGutter,
        paddingTop: '0px'
      },
      userAvatar: {
        position: 'relative',
        top: '5px'
      },
      user: {
        paddingTop: '0px',
        paddingLeft: Spacing.desktopGutter,
        color: Typography.textFullWhite,
        backgroundColor: Colors.teal500,
        height: 56
      },
      userName: {
        display: 'inline',
        marginLeft: 16,
        marginBottom: 15,
        letterSpacing: 0,
        fontSize: 15,
        lineHeight: '48px',
        fontWeight: 400,
        position: 'relative',
        top: '-10px'
      }
    };
  },
  getMenuItem() {

    let menuItems = [
      {
        route: 'new-pack',
        text: '新增懶人包'
      }, {
        route: 'delete-pack',
        text: '刪除懶人包'
      }, {
        route: 'folder-manerger',
        text: '管理資料夾'
      }, {
        type: MenuItem.Types.SUBHEADER,
        text: '資料夾'
      },
    ];

    for (let item of this.state.folder) {
      menuItems.push(item);
    }

    return menuItems;
  },
  render: function() {
    let header = (
      <div>
        <div onTouchTap={this._onHeaderClick} style={this.getStyles().appName}>
          EasyLearn
        </div>
        <ClearFix>
          <div style={this.getStyles().user}>
            <Avatar src={"http://graph.facebook.com/" + this.state.userId + "/picture"} style={this.getStyles().userAvatar}/>
            <div style={this.getStyles().userName}>
              {this.state.username}
            </div>
            <IconButton style={{
              float: 'right'
            }}>
              <DirectionsWalk color="white"/>
            </IconButton>
          </div>
        </ClearFix>
      </div>
    );

    let docked;
    if (this.isDeviceSize(StyleResizable.statics.Sizes.LARGE)) {
      docked = true;
    } else {
      docked = false;
    }

    let menuItems = this.getMenuItem();

    return (
      <LeftNav docked={this.state.docked} header={header} menuItems={menuItems} onChange={this._onLeftNavChange} ref="leftNav" selectedIndex={this._getSelectedIndex()}/>
    );
  },

  toggle() {
    this.refs.leftNav.toggle();
  },

  _onHeaderClick() {
    this.context.router.transitionTo('root');
    this.refs.leftNav.close();
  },

  _onLeftNavChange(e, key, payload) {
    if (payload.route === 'folder-list') {
      EasyLearnActions.folderView(payload.id);
    }
    this.transitionTo(payload.route);
    if (!this.isDeviceSize(StyleResizable.statics.Sizes.LARGE)) {
      this.refs.leftNav.close();
    }

  },

  _getSelectedIndex() {
    let currentItem;
    let menuItems = this.getMenuItem();

    for (let i = menuItems.length - 1; i >= 0; i--) {
      currentItem = menuItems[i];
      if (this.isActive('folder-list') && (currentItem.id === FolderStore.getViewFolderId())) {
        return i;
      } else if (currentItem.route && this.isActive(currentItem.route) && !this.isActive('folder-list'))
        return i;
    }
  }

});

module.exports = AppLeftNav;
