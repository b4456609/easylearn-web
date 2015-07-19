let React = require('react');
let Router = require('react-router');
let AppMenuWithContent = require('./app-menu');
let FullWidthSection = require('./full-width-section');
let ActionHome = require('../svg-icons/action-home');
let DirectionsWalk = require('../svg-icons/directions-walk');
let FolderStore = require('../stores/folder-store.jsx');
let UserStore = require('../stores/user-store.jsx');
let AppStore = require('../stores/app-store.jsx');
let EasyLearnActions = require('../action/easylearn-actions.jsx');
let Home = require('./pages/home.jsx');
let Fail = require('./pages/fail.jsx');
let AppLeftNav = require('./app-left-nav');

let Navigation = Router.Navigation;
let {
  AppBar,
  AppCanvas,
  IconButton,
  Menu,
  Styles,
  LeftNav
} = require('material-ui');

let RouteHandler = Router.RouteHandler;
let {
  Colors,
  Typography
} = Styles;
let ThemeManager = new Styles.ThemeManager();

function getState() {
  return {
    username: UserStore.getUserName(),
    userId: UserStore.getUserId(),
    syncFail: AppStore.isSyncFail()
  }
}

let Master = React.createClass({
  mixins: [
    Router.State, Navigation
  ],

  contextTypes: {
    router: React.PropTypes.func
  },

  childContextTypes: {
    muiTheme: React.PropTypes.object
  },

  getInitialState: function() {
    return {
      folder: [],
      username: UserStore.getUserName(),
      userId: UserStore.getUserId(),
      syncFail: AppStore.isSyncFail()
    };
  },

  _onChange: function() {
    this.setState(getState());
  },

  getChildContext: function() {
    return {
      muiTheme: ThemeManager.getCurrentTheme()
    }
  },

  componentWillMount: function() {
    console.log('[master] componentWillMount');
    if (this.state.userId === '') {
      this.transitionTo('home');
      EasyLearnActions.fbInit();
    } else {
      this.transitionTo('folder-list');
      EasyLearnActions.sync();
    }
  },

  componentDidMount: function() {
    console.log('[master] componentDidMount');

    AppStore.addChangeListener(this._onChange);
    UserStore.addChangeListener(this._onChange);
  },

  componentWillUnmount: function() {
    AppStore.removeChangeListener(this._onChange);
    UserStore.removeChangeListener(this._onChange);
  },


  getStyles: function() {
    let darkWhite = Colors.darkWhite;
    return {
      footer: {
        backgroundColor: Colors.grey900,
        textAlign: 'center'
      },
      a: {
        color: darkWhite
      },
      p: {
        margin: '0 auto',
        padding: '0',
        color: Colors.lightWhite,
        maxWidth: '335px'
      },
      userName: {
        color: 'white',
        marginTop: 15,
        letterSpacing: 0,
        fontSize: 15,
        fontWeight: 400,
        float: 'left'
      }
    };
  },

  getContent: function() {



    let folderTitle = (
      <h3>資料夾</h3>
    );

    // let content = (
    //   <AppMenuWithContent folderItems={this.state.folder} folderTitle={folderTitle} menuItems={menuItems}/>
    // );

    let content = (
      <div>
        <RouteHandler />
      </div>
    );


    if (this.isActive('home') || this.isActive('/')) {
      content = (
        <Home/>
      );
    }
    else if(this.state.syncFail){
      content = (
        <Fail/>
      );
    }

    return content;
  },

  render: function() {
    let styles = this.getStyles();
    let title = 'EasyLearn';
    let homeIcon = (
      <div/>
    );

    let logoutBtn = (
      <div>
        <h3 style={styles.userName}>{this.state.username}</h3>
        <IconButton>
          <DirectionsWalk color="white"/></IconButton>
      </div>
    );
    let zDepth = 1;

    if (this.isActive('home') || this.isActive('/')){
      title = '';
      zDepth = 0;
    }

    let content = this.getContent();

    return (
      <AppCanvas>

        <AppBar onLeftIconButtonTouchTap={this._onLeftIconButtonTouchTap} iconElementRight={logoutBtn} title={title} zDepth={zDepth}/>

        <AppLeftNav ref="leftNav"/>


        {content}

      </AppCanvas>
    );
  },

  _onLeftIconButtonTouchTap() {
    this.refs.leftNav.toggle();
  }
});

module.exports = Master;
