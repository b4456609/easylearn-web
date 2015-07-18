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

let Navigation = Router.Navigation;
let {
  AppBar,
  AppCanvas,
  IconButton,
  Menu,
  Styles
} = require('material-ui');

let RouteHandler = Router.RouteHandler;
let {
  Colors,
  Typography
} = Styles;
let ThemeManager = new Styles.ThemeManager();

function getState() {
  return {
    folder: FolderStore.getFolderMenu(),
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
    return getState();
  },

  _onChange: function() {
    this.setState(getViewPackState());
  },

  getChildContext: function() {
    return {
      muiTheme: ThemeManager.getCurrentTheme()
    }
  },

  componentDidMount: function() {
    console.log('[master] componentDidMount');
    if (this.state.userId === '') {
      this.transitionTo('home');
      EasyLearnActions.fbInit();
    } else {
      this.transitionTo('folder-list');
      EasyLearnActions.sync();
    }
    AppStore.addChangeListener(this._onChange);
    FolderStore.addChangeListener(this._onChange);
    UserStore.addChangeListener(this._onChange);
  },

  componentWillUnmount: function() {
    AppStore.removeChangeListener(this._onChange);
    FolderStore.removeChangeListener(this._onChange);
    UserStore.removeChangeListener(this._onChange);
  },

  _onChange: function() {
    this.setState(getState());
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

    let menuItems = [
      {
        route: 'home',
        text: '首頁'
      }, {
        route: 'new-pack',
        text: '新增懶人包'
      }, {
        route: 'delete-pack',
        text: '刪除懶人包'
      }, {
        route: 'folder-manerger',
        text: '管理資料夾'
      }
    ];

    let folderTitle = (
      <h3>資料夾</h3>
    );

    let content = (
      <AppMenuWithContent folderItems={this.state.folder} folderTitle={folderTitle} menuItems={menuItems}/>
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

        <AppBar iconElementLeft={homeIcon} iconElementRight={logoutBtn} title={title} zDepth={zDepth}/>

        {content}

      </AppCanvas>
    );
  }
});

module.exports = Master;
