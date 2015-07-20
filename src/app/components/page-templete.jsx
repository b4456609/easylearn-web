let React = require('react');
let { Styles, Mixins } = require('material-ui');

let { Spacing, Colors } = Styles;
let {
  StylePropable,
  StyleResizable
} = Mixins;

let PageTemplete = React.createClass({

  mixins: [
    StylePropable,StyleResizable, React.addons.LinkedStateMixin
  ],

  getStyle: function () {
    let styles =  {
      root:{
        paddingTop:Spacing.desktopKeylineIncrement + 'px'
      },
      content:{
        margin: '0 auto',
        maxWidth: 660,
        padding: Spacing.desktopGutter + 'px',
      },
      contentWhenLarge:{
        margin: '0 auto',
        maxWidth: 960,
      },
      sidebarMargin:{
        marginLeft: 0
      },
      sidebarMarginWhenLarge:{
        marginLeft: 256
      }
    };

    if(this.isDeviceSize(StyleResizable.statics.Sizes.LARGE)){
      styles.content = this.mergeStyles(styles.content, styles.contentWhenLarge);
      styles.sidebarMargin = this.mergeStyles(styles.sidebarMargin, styles.sidebarMarginWhenLarge);
    }

    return styles;
  },

  render: function() {
    let styles = this.getStyle();
    return (
      <div style={styles.root}>
        <div style={styles.sidebarMargin}>
        <div style={styles.content}>
          {this.props.children}
        </div>
        </div>
      </div>
    );
  }

});

module.exports = PageTemplete;
