let React = require('react');
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

let { StylePropable, StyleResizable } = Mixins;

function getState() {
  return {
    folder: FolderStore.getFolderMenu()
  }
}

let AppLeftNav = React.createClass({
  mixins: [StylePropable, StyleResizable],

  getInitialState: function() {
    return {
      folder: []
    };
  },

  componentDidMount: function() {
    FolderStore.addChangeListener(this._onChange);
    let self = this;
    window.addEventListener("resize", function() {
      if (self.isDeviceSize(StyleResizable.statics.Sizes.LARGE)) {
          self.refs.leftNav.close();
          self.refs.leftNav.toggle();
      } else {
        self.refs.leftNav.close();
      }
    });
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

  render: function() {
    let header = (
      <div style={this.getStyles()} onTouchTap={this._onHeaderClick}>
        EasyLearn
      </div>
    );

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

    for(let item of this.state.folder){
      menuItems.push(item);
    }

    let docked;
    if (this.isDeviceSize(StyleResizable.statics.Sizes.LARGE)) {
      docked = true;
    } else {
      docked = false;
    }

    return (
      <LeftNav
        docked={docked}
        ref="leftNav"
        header={header}
        menuItems={menuItems}/>
    );
  },

  toggle() {
    this.refs.leftNav.toggle();
  }

});

module.exports = AppLeftNav;
