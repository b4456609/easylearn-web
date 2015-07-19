let React = require('react');
let Router = require('react-router');
let RouteHandler = Router.RouteHandler;
let ReactCSSTransitionGroup = React.addons.CSSTransitionGroup;
let EasyLearnActions = require('../../action/easylearn-actions.jsx');
let PackInfo = require('./components/pack-info.jsx');
let PackItem = require('./components/pack-item.jsx');
let PageTemplete = require('../page-templete.jsx');
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
    this.setState({hoverPack: null});
  },

  getStyles: function() {
    return {
      root: {
      },
      rightBlock: {
        position: 'fixed',
        right: 50
      },
      content: {
        margin: '0 auto',
        maxWidth: 8.3 * 6 + '%', // 12 of 6 col
      }
    };
  },

  getPackPaperNode(){
    let self = this;

    return this.state.packArray.map(function(pack, i) {
      return (
        <PackItem key={i} pack={pack} onClick={self._onPackClick.bind(self, pack.id)} onMouseEnter={self._onPackMouseEnter.bind(self, i)}/>
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
    //
    //  <PackInfo pack={this.state.hoverPack} />
    return (
      <PageTemplete>
        <div style={styles.root}>
        <div style={styles.content}>
          <ClearFix>
            <ReactCSSTransitionGroup transitionName="example">
              {packNodes}
            </ReactCSSTransitionGroup>
          </ClearFix>
        </div>
        </div>
      </PageTemplete>
    );
  },

  _onPackClick: function(packId) {
    EasyLearnActions.packView(packId);
    this.context.router.transitionTo('view-pack');
  }

});

module.exports = FolderList;
