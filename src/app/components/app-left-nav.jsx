let React = require('react');
let {
  Navigation,
  State
} = require('react-router');
let EasyLearnActions = require('../action/easylearn-actions.jsx');
let FolderStore = require('../stores/folder-store.jsx');
let {
  LeftNav,
  Styles,
  MenuItem,
  Mixins
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
      docked: true
    };
  },

  componentDidMount: function() {
    FolderStore.addChangeListener(this._onChange);
    let self = this;
    window.addEventListener("resize", function() {
      self.determinOpenOrClose();
    });

    if (window.innerWidth < 900) {
      this.refs.leftNav.close();
      this.refs.leftNav.toggle();
    }

  },

  determinOpenOrClose() {
    if (this.isDeviceSize(StyleResizable.statics.Sizes.LARGE)) {
      this.refs.leftNav.close();
      this.refs.leftNav.toggle();
      this.setState({docked : true});
    } else {
      this.refs.leftNav.close();
      this.setState({docked : false});
    }
  },

  componentWillUnmount: function() {
    FolderStore.removeChangeListener(this._onChange);
  },

  _onChange: function() {
    this.setState(getState());
  },

  getStyles() {
    return {
      cursor: 'pointer',
//.mui-font-style-headline
      fontSize: '24px',
      color: Typography.textFullWhite,
      lineHeight: Spacing.desktopKeylineIncrement + 'px',
      fontWeight: Typography.fontWeightLight,
      backgroundColor: Colors.cyan500,
      paddingLeft: Spacing.desktopGutter,
      paddingTop: '0px',
      marginBottom: '8px'
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
      <div onTouchTap={this._onHeaderClick} style={this.getStyles()}>
        EasyLearn
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
    if (!this.isDeviceSize(StyleResizable.statics.Sizes.LARGE)) {
      this.refs.leftNav.close();
    }
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
