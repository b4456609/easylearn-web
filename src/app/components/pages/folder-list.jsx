let React = require('react');
let Router = require('react-router');
let RouteHandler = Router.RouteHandler;
let EasyLearnActions = require('../../action/easylearn-actions.jsx');
let PackInfo = require('./components/pack-info.jsx');
let {
  Styles,
  Paper,
  ClearFix
} = require('material-ui');

let DesktopGutter = Styles.Spacing.desktopGutter;
let FolderStore = require('../../stores/folder-store.jsx');
let PackStore = require('../../stores/pack-store.jsx');

function getState() {
  let list = FolderStore.getPackInFolder();
  let items = PackStore.getFolderList(list);
  return {
    packArray: items
  };
}

let FolderList = React.createClass({

  contextTypes: {
    router: React.PropTypes.func
  },

  getInitialState: function() {
    let state = getState();
    return {
      hoverPack: null,
      packArray: state.packArray
    };
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
        marginBottom: 16,
        WebkitTouchCallout: 'none',
        WebkitUserSelect: 'none',
        KhtmlUserSelect: 'none',
        MozUserSelect: 'none',
        MsUserSelect: 'none',
        userSelect: 'none',
      },
      paperPadding: {
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
      },
      des: {
        paddingTop: '16px',
        margin: 0,
      },
      img: {
        maxWidth: '100px',
        maxHeight: '100px'
      },
      content: {
        marginRight: '324px',
        marginBottom: '16px'
      },
      rightBlock: {
        position: 'fixed',
        right: 50
      },
      root: {
        maxWidth: '1920px'
      }
    };
  },

  getPackPaperNode(){
    let self = this;
    let styles = this.getStyles();

    return this.state.packArray.map(function(pack, i) {
      return (
        <Paper onDoubleClick={self._onClick.bind(self, pack.id)} style={styles.paper} zDepth={1} onClick={self._onPackMouseEnter.bind(self, i)} onMouseLeave  ={self._onPackMouseLeave}>
          <div style={styles.paperPadding}>
            <ClearFix>
              <div style={styles.left}>
                <img src={pack.img} style={styles.img}/></div>
                <div style={styles.right}>
                  <h1 style={styles.title}>
                    {pack.name}
                  </h1>
                  <p style={styles.des}>
                    {pack.description}</p>
                </div>
              </ClearFix>
            </div>
          </Paper>
      );
    });
  },

  _onPackMouseEnter(i){
    let pack = this.state.packArray[i];
    this.setState({hoverPack: pack});
  },

  render: function() {
    let packNodes = this.getPackPaperNode();
    let styles = this.getStyles();

    return (
      <div style={styles.root}>
        <div style={styles.rightBlock}>
          <PackInfo pack={this.state.hoverPack} />
        </div>
        <div style={styles.content}>
          <ClearFix>
          {packNodes}
          </ClearFix>
        </div>
      </div>
    );
  },

  _onClick: function(packId) {
    EasyLearnActions.packView(packId);
    this.context.router.transitionTo('view-pack');
  }

});

module.exports = FolderList;
