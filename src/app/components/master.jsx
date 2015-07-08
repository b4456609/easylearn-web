let React = require('react');
let Router = require('react-router');
let AppMenuWithContent = require('./app-menu');
let FullWidthSection = require('./full-width-section');
let ActionHome = require('../svg-icons/action-home');
let DirectionsWalk = require('../svg-icons/directions-walk');
let FolderStore = require('../stores/folder-store.jsx');
let UserStore = require('../stores/user-store.jsx');
let EasyLearnActions = require('../action/easylearn-actions.jsx');
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
      //fb.componentDidMount();
      //EasyLearnActions.sync();
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

    let contnet = (<AppMenuWithContent folderItems={this.state.folder} folderTitle={folderTitle} menuItems={menuItems}/>);

    //display login page
    if(this.state.userId === ''){
      contnet = (<IconButton>
        <DirectionsWalk color="green"/></IconButton>);
    }

    return (
      <AppCanvas>

        <AppBar iconElementLeft={homeIcon} iconElementRight={logoutBtn} title={title} zDepth={1}/>

        {contnet}

      </AppCanvas>
    );
  }
});

module.exports = Master;
