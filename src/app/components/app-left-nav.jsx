let React = require('react');
let Router = require('react-router');
let {
  MenuItem,
  Mixins,
  LeftNav,
  Styles
} = require('material-ui');
let {
  Colors,
  Spacing,
  Typography
} = Styles;
let {
  StyleResizable,
  StylePropable
} = Mixins;

let menuItems = [
  {
    route: 'get-started',
    text: 'Get Started'
  }, {
    route: 'customization',
    text: 'Customization'
  }, {
    route: 'components',
    text: 'Components'
  }, {
    type: MenuItem.Types.SUBHEADER,
    text: 'Resources'
  }, {
    type: MenuItem.Types.LINK,
    payload: 'https://github.com/callemall/material-ui',
    text: 'GitHub'
  }, {
    type: MenuItem.Types.LINK,
    payload: 'http://facebook.github.io/react',
    text: 'React'
  }, {
    type: MenuItem.Types.LINK,
    payload: 'https://www.google.com/design/spec/material-design/introduction.html',
    text: 'Material Design'
  }
];

let AppLeftNav = React.createClass({
  mixins: [
    StyleResizable, StylePropable
  ],
  contextTypes: {
    router: React.PropTypes.func
  },

  getInitialState: function() {
    return {
      docked: true
    };
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

  componentDidMount: function() {
    let self = this;
    window.addEventListener("resize", function () {
      if (window.innerWidth > 900) {
        if(!self.state.docked){
          self.refs.leftNav.close();
          self.refs.leftNav.toggle();
        }
        self.setState({docked:true})
      }
      else{
        if (self.state.docked) {
          self.refs.leftNav.close();
        }
        self.setState({docked:false})

      }
    });
  },

  resize(){
    if (window.innerWidth > 900) {
      return true;
    } else {
      return false;
    }
  },


  render() {
    let header = (
      <div onTouchTap={this._onHeaderClick} style={this.getStyles()}>
        material ui
      </div>
    );

    let docked = this.resize();

    return (
      <LeftNav docked={docked} header={header} menuItems={menuItems} onChange={this._onLeftNavChange} ref="leftNav" selectedIndex={this._getSelectedIndex()}/>
    );
  },

  toggle() {
    this.refs.leftNav.toggle();
  },

  _getSelectedIndex() {
    let currentItem;

    for (let i = menuItems.length - 1; i >= 0; i--) {
      currentItem = menuItems[i];
      if (currentItem.route && this.context.router.isActive(currentItem.route))
        return i;
    }
  },

  _onLeftNavChange(e, key, payload) {
    this.context.router.transitionTo(payload.route);
  },

  _onHeaderClick() {
    this.context.router.transitionTo('root');
    this.refs.leftNav.close();
  }
});

module.exports = AppLeftNav;
