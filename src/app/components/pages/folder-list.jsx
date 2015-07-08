let React = require('react');
let Router = require('react-router');
let RouteHandler = Router.RouteHandler;
let EasyLearnActions = require('../../action/easylearn-actions.jsx');
let {
  Styles,
  Paper,
  ClearFix
} = require('material-ui');
let EasyLearnApi = require('../../api/easylearn-api.jsx');

let DesktopGutter = Styles.Spacing.desktopGutter;
let FolderStore = require('../../stores/folder-store.jsx');
let PackStore = require('../../stores/pack-store.jsx');

function getState() {
  var list = FolderStore.getPackInFolder();
  var items = PackStore.getFolderList(list);
  return {
    packArray: items
  };
}

var FolderList = React.createClass({

  contextTypes: {
    router: React.PropTypes.func
  },

  getInitialState: function() {
    return getState();
  },

  componentDidMount: function() {
    PackStore.addChangeListener(this._onChange);
    FolderStore.addChangeListener(this._onChange);
  },

  componentWillUnmount: function() {
    PackStore.removeChangeListener(this._onChange);
    FolderStore.removeChangeListener(this._onChange);
  },

  _onChange: function() {
    this.setState(getState());
  },

  getStyles: function() {
    return {
      paper: {
        marginBottom: 16
      },
      root: {
        padding: '16px'
      },
      left: {
        float: 'left',
        marginRight: 16,
        width: 150
      },
      right: {
        marginLeft: 158
      },
      title: {
        lineHeight: '1.25em',
        paddingTop: '6px',
        fontFamily: '"Roboto", sans-serif, "微軟正黑體", "Microsoft JhengHei"'
      },
      des: {
        paddingTop: '16px',
        margin: 0,
        fontFamily: '"Roboto", sans-serif, "微軟正黑體", "Microsoft JhengHei"'
      },
      img: {
        maxWidth: '150px',
        maxHeight: '150px'
      }
    };
  },

  render: function() {
    let self = this;
    let styles = this.getStyles();

    var packNodes = this.state.packArray.map(function(pack) {
      let imgSrc = 'img/light102.png';
      if (pack.cover_filename !== ""){
        let imgSrc =  EasyLearnApi.getServerUrl() + 'easylearn/download?filename=' + pack.cover_filename + '&pack_id=' + pack.id;
      }
      return (
        <Paper onClick={self._onClick.bind(self, pack.id)} style={styles.paper} zDepth={1}>
          <div style={styles.root}>
            <ClearFix>
              <div style={styles.left}>
                <img src={imgSrc} style={styles.img}/></div>
                <div style={styles.right}>
                  <h1 style={styles.title}>
                    {pack.title}
                  </h1>
                  <p style={styles.des}>
                    {pack.description}</p>
                </div>
              </ClearFix>
            </div>
          </Paper>
      );
    });

    return (
      <div>
        {packNodes}
      </div>
    );
  },

  _onClick: function(packId) {
    EasyLearnActions.packView(packId);
    this.context.router.transitionTo('view-pack');
  }

});

module.exports = FolderList;
