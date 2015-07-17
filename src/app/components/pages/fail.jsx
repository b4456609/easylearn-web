let React = require('react');
let FullWidthSection = require('../full-width-section');
let { Mixins, RaisedButton, Styles } = require('material-ui');
let { StylePropable, StyleResizable } = Mixins;
let { Colors, Spacing, Typography } = Styles;


let Fail = React.createClass({
  mixins: [StylePropable, StyleResizable],

  _getHomePageHero: function() {
    let styles = {
      root: {
        backgroundColor: Colors.cyan500,
        overflow: 'hidden'
      },
      svgLogo: {
        marginLeft: (window.innerWidth * 0.5) - 130 + 'px',
        width: '420px'
      },
      tagline: {
        margin: '16px auto 0 auto',
        textAlign: 'center',
        maxWidth: '575px'
      },
      label: {
        color: Colors.white,
      },
      startBtnLable: {
        fontSize: '1.25em',
        fontWeight: 'bold',
        color: Colors.cyan500,
      },
      facebookStyle: {
        margin: '16px 32px 0px 32px',
      },
      h1: {
        color: Colors.darkWhite,
        fontWeight: Typography.fontWeightLight,
        lineHeight: '1.25em'
      },
      h2: {
        //.mui-font-style-title
        fontSize: '20px',
        lineHeight: '28px',
        paddingTop: '19px',
        marginBottom: '13px',
        letterSpacing: '0',
      },
      nowrap: {
        whiteSpace: 'nowrap'
      },
      taglineWhenLarge: {
        marginTop: '32px'
      },
      h1WhenLarge: {
        fontSize: '56px'
      },
      h2WhenLarge: {
        //.mui-font-style-headline;
        fontSize: '24px',
        lineHeight: '32px',
        paddingTop: '16px',
        marginBottom: '12px'
      }
    };

    styles.h2 = this.mergeStyles(styles.h1, styles.h2);

    if (this.isDeviceSize(StyleResizable.statics.Sizes.LARGE)) {
      styles.tagline = this.mergeStyles(styles.tagline, styles.taglineWhenLarge);
      styles.h1 = this.mergeStyles(styles.h1, styles.h1WhenLarge);
      styles.h2 = this.mergeStyles(styles.h2, styles.h2WhenLarge);
    }

    return (
      <FullWidthSection style={styles.root}>
          <div style={styles.tagline}>
            <h1 style={styles.h1}>伺服器發生錯誤</h1>
            <h2 style={styles.h2}>
              請稍後再重試
            </h2>
          </div>
      </FullWidthSection>
    );
  },

  render: function() {
    let style = {
      paddingTop: Spacing.desktopKeylineIncrement
    };

    return (
      <div style={style}>
        {this._getHomePageHero()}
      </div>
    );
  }

});

module.exports = Fail;
