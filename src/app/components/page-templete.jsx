let React = require('react');
let { Styles } = require('material-ui');

let { Spacing, Colors } = Styles;
let PageTemplete = React.createClass({

  getStyle: function () {
    return {
      root:{
        paddingTop:Spacing.desktopKeylineIncrement + 'px'
      },
      content:{
        boxSizing: 'border-box',
        padding: Spacing.desktopGutter + 'px',
      }
    }
  },

  render: function() {
    let styles = this.getStyle();
    return (
      <div style={styles.root}>
        <div style={styles.content}>
          {this.props.children}
        </div>
      </div>
    );
  }

});

module.exports = PageTemplete;
