let React = require('react');
let Router = require('react-router');
let RouteHandler = Router.RouteHandler;
let EasyLearnActions = require('../action/easylearn-actions.jsx');
let FolderStore = require('../stores/folder-store.jsx');
let { Menu, Mixins, Styles } = require('material-ui');

let { Spacing, Colors } = Styles;
let { StyleResizable, StylePropable } = Mixins;


let PageWithNav = React.createClass({

  mixins: [StyleResizable, StylePropable],

  contextTypes: {
    router: React.PropTypes.func
  },

  propTypes: {
    menuItems: React.PropTypes.array,
    folderItems: React.PropTypes.array
  },

  getStyles(){
    let subNavWidth = Spacing.desktopKeylineIncrement * 3 + 'px';
    let styles = {
      root: {
        paddingTop: Spacing.desktopKeylineIncrement + 'px'
      },
      rootWhenMedium: {
        position: 'relative'
      },
      secondaryNav: {
        borderTop: 'solid 1px ' + Colors.grey300,
        overflow: 'hidden'
      },
      content: {
        boxSizing: 'border-box',
        padding: Spacing.desktopGutter + 'px',
        maxWidth: (Spacing.desktopKeylineIncrement * 14) + 'px'
      },
      secondaryNavWhenMedium: {
        borderTop: 'none',
        position: 'absolute',
        top: '64px',
        width: subNavWidth
      },
      contentWhenMedium: {
        marginLeft: subNavWidth,
        borderLeft: 'solid 1px ' + Colors.grey300,
        minHeight: '800px'
      },
      label:{
        marginTop: 10,
        marginLeft: 20
      }
    };

    if (this.isDeviceSize(StyleResizable.statics.Sizes.MEDIUM) ||
        this.isDeviceSize(StyleResizable.statics.Sizes.LARGE)) {
      styles.root = this.mergeStyles(styles.root, styles.rootWhenMedium);
      styles.secondaryNav = this.mergeStyles(styles.secondaryNav, styles.secondaryNavWhenMedium);
      styles.content = this.mergeStyles(styles.content, styles.contentWhenMedium);
    }

    return styles;
  },

  render() {
    let styles = this.getStyles();
    return (
      <div style={styles.root}>
        <div style={styles.content}>
          <RouteHandler />
        </div>
        <div style={styles.secondaryNav}>
          <Menu
            ref="menuItems"
            zDepth={0}
            menuItems={this.props.menuItems}
            selectedIndex={this._getSelectedIndex()}
            onItemTap={this._onMenuItemClick} />
          <div style={styles.label}>
            {this.props.folderTitle}
          </div>
          <Menu
            ref="folderItems"
            zDepth={0}
            menuItems={this.props.folderItems}
            selectedIndex={this._getFolderSelectedIndex()}
            onItemTap={this._onFolderMenuItemClick}
             autoWidth={false} />
        </div>
      </div>
    );
  },

  _getSelectedIndex() {
    let menuItems = this.props.menuItems;
    let currentItem;

    for (let i = menuItems.length - 1; i >= 0; i--) {
      currentItem = menuItems[i];
      if (currentItem.route && this.context.router.isActive(currentItem.route)) return i;
    }
  },

  _getFolderSelectedIndex() {
    let folderItems = this.props.folderItems;
    let currentItem;

    if(!this.context.router.isActive('folder-list')){
      return;
    }

    for (let i = folderItems.length - 1; i >= 0; i--) {
      currentItem = folderItems[i];
      if (currentItem.id === FolderStore.getViewFolderId()) return i;
    }
  },

  _onFolderMenuItemClick(e, index, item) {
    EasyLearnActions.folderView(item.id);
    this.context.router.transitionTo(item.route);
  },

  _onMenuItemClick(e, index, item) {
    this.context.router.transitionTo(item.route);
  }

});

module.exports = PageWithNav;
