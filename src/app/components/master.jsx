let React = require('react');
let Router = require('react-router');
let AppMenuWithContent = require('./app-menu');
let FullWidthSection = require('./full-width-section');
let ActionHome = require('../svg-icons/action-home');
let DirectionsWalk = require('../svg-icons/directions-walk');
let FolderStore = require('../stores/folder-store.jsx');
let UserStore = require('../stores/user-store.jsx');
let EasyLearnActions = require('../action/easylearn-actions.jsx');
let Home = require('./pages/home.jsx');

var Navigation = Router.Navigation;
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
    userId: UserStore.getUserId()
  }
}

var Master = React.createClass({
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
    console.log(this.state.userId);
    if (this.state.userId === '') {
      this.transitionTo('home');
      EasyLearnActions.fbInit();
    }
    else{
      EasyLearnActions.sync();      
    }

    FolderStore.addChangeListener(this._onChange);
    UserStore.addChangeListener(this._onChange);
  },

  componentWillUnmount: function() {
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

  render: function() {
    let styles = this.getStyles();
    let title = 'EasyLearn';
    let homeIcon = (
      <div/>
    );
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
      }
    ];

    let folderTitle = (
      <h3>資料夾</h3>
    );
    let logoutBtn = (
      <div>
        <h3 style={styles.userName}>{this.state.username}</h3>
        <IconButton>
          <DirectionsWalk color="white"/></IconButton>
      </div>
    );

    let content = (
      <AppMenuWithContent folderItems={this.state.folder} folderTitle={folderTitle} menuItems={menuItems}/>
    );

    let zDepth = 1;

    if (this.isActive('home') || this.isActive('/')) {
      content = (
        <Home/>
      );
      zDepth = 0;
      title = '';
    }

    return (
      <AppCanvas>

        <AppBar iconElementLeft={homeIcon} iconElementRight={logoutBtn} title={title} zDepth={zDepth}/>

        {content}

      </AppCanvas>
    );
  }
});

module.exports = Master;
