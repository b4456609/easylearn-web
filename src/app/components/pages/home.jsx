let React = require('react');
let Router = require('react-router');
let { Mixins, RaisedButton, Styles } = require('material-ui');
let FullWidthSection = require('../full-width-section');

let { StylePropable, StyleResizable } = Mixins;
let { Colors, Spacing, Typography } = Styles;
let ThemeManager = new Styles.ThemeManager().getCurrentTheme();


let HomePage = React.createClass({

  mixins: [StylePropable, StyleResizable],

  contextTypes: {
    router: React.PropTypes.func,
  },

  childContextTypes: {
    muiTheme: React.PropTypes.object
  },

  render() {
    let style = {
      paddingTop: Spacing.desktopKeylineIncrement
    };

    return (
      <div style={style}>
        {this._getHomePageHero()}
        {this._getHomePurpose()}
        {this._getHomeContribute()}
      </div>
    );
  },

  getChildContext() {
    return {
      muiTheme: ThemeManager.getCurrentTheme()
    }
  },

  componentWillMount() {
    ThemeManager.setComponentThemes({
      raisedButton: {
        color: '#3b5998'
      }
    });
  },

  _getHomePageHero() {
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
            <h1 style={styles.h1}>EasyLearn</h1>
            <h2 style={styles.h2}>
              結合社群網路、集體智慧與行動學習概念<br />提供互動式的社群行動學習平台
            </h2>
            <RaisedButton
              label="Login With Facebook"
              onTouchTap={this._onDemoClick}
              linkButton={true}
              style={styles.facebookStyle}
              labelStyle={styles.label}/>
          </div>
      </FullWidthSection>
    );
  },

  _getHomePurpose() {
    let styles = {
      root: {
        backgroundColor: Colors.grey200
      },
      content: {
        maxWidth: '700px',
        padding: 0,
        margin: '0 auto',
        fontWeight: Typography.fontWeightLight,
        fontSize: '20px',
        lineHeight: '28px',
        paddingTop: '19px',
        marginBottom: '13px',
        letterSpacing: '0',
        color: Typography.textDarkBlack
      }
    };

    return (
      <FullWidthSection style={styles.root} useContent={true} contentStyle={styles.content} contentType="p" className="home-purpose">
        建構一個可便利建立、分享、閱讀、討論、更新懶人包的行動應用軟體，將特定主題的知識藉由社群的共筆、註解、評論等方式達成知識的吸收與散佈，建立一個新型態的行動學習模式。
      </FullWidthSection>
    );
  },

  _getHomeContribute() {
    let styles = {
      root: {
        backgroundColor: Colors.grey200,
        textAlign: 'center'
      },
      h3: {
        margin: '0',
        padding: '0',
        fontWeight: Typography.fontWeightLight,
        fontSize: '22'
      },
      button: {
        marginTop: 32
      }
    };

    return (
      <FullWidthSection useContent={true} style={styles.root}>
        <h3 style={styles.h3}>
          Want to help make this <span style={styles.nowrap}>project awesome?</span> <span style={styles.nowrap}>Check out our repo.</span>
        </h3>
        <RaisedButton label="GitHub" primary={true} linkButton={true} href="https://github.com/callemall/material-ui" style={styles.button}/>
      </FullWidthSection>
    );
  },

  _onDemoClick() {
    this.context.router.transitionTo('components');
  }
});

module.exports = HomePage;
