var React = require('react');
let Router = require('react-router');
var PackStore = require('../../stores/pack-store');
let EasyLearnActions = require('../../action/easylearn-actions.jsx');

let Tooltip = require('../../api/tooltip-api.js');

let Navigation = Router.Navigation;

let {
  Styles,
  Paper,
  ClearFix,
  ListItem,
  List,
} = require('material-ui');

function getViewPackState() {
  return {
    pack: PackStore.getViewVersion()
  };
}

var ViewPack = React.createClass({
  mixins: [
    Navigation
  ],

  getInitialState: function() {
    return getViewPackState();
  },

  componentDidUpdate: function(prevProps, prevState) {
    Tooltip.init(this.state.pack.version.note);
  },

  componentDidMount: function() {
    Tooltip.init(this.state.pack.version.note);
    PackStore.addChangeListener(this._onChange);
  },

  componentWillUnmount: function() {
    PackStore.removeChangeListener(this._onChange);
  },

  _onChange: function() {
    this.setState(getViewPackState());
  },

  getStyles: function() {
    return {
      contentPaper: {
        marginRight: '324px',
        marginBottom: '16px'
      },
      contentPadding: {
        padding: '16px'
      },
      title: {
        lineHeight: '1.25em',
        fontSize: '25px',
        paddingTop: '6px'
      },
      content: {
        paddingTop: '6px',
        fontSize: '16px'
      },
      versionPaper: {
        float: 'right',
        width: '100%'
      },
      rightBlock: {
        float: 'right',
        width: '300px'
      },
      root: {
        maxWidth: '1920px'
      }
    }
  },


  getVersion: function() {
    let self = this;
    let items = this.state.pack.versionInfo.map(function(item, i) {
      return (
        <ListItem
          primaryText={item.text} onClick={self._onVersionTapTouch.bind(self, item.id)}
          key={i}/>
      );
    });

    let result = (
      <List subheader="懶人包版本">
        <ListItem primaryText='修改此懶人包' onClick={this._onModifiedPackClick.bind(this, this.state.pack.version.id)}/>
        {items}
      </List>
    );

    return result;
  },

  render: function() {
    let styles = this.getStyles();
    let version = this.getVersion();
    return (
      <ClearFix>
        <div style={styles.root}>

          <div style={styles.rightBlock}>
            <ClearFix>
              <Paper style={styles.versionPaper} zDepth={1}>
                {version}
              </Paper>
            </ClearFix>
          </div>

          <Paper style={styles.contentPaper} zDepth={1}>
            <div style={styles.contentPadding}>
              <h1 style={styles.title}>
                {this.state.pack.title}
              </h1>
              <div dangerouslySetInnerHTML={{__html: this.state.pack.version.content}} id="content" style={styles.content}/>
            </div>
          </Paper>

        </div>
      </ClearFix>
    );
  },

  _onVersionTapTouch: function (id, e) {
    EasyLearnActions.checkoutVersion(id);
  },

  _onModifiedPackClick: function () {
    this.transitionTo('modified-pack');
  }

});

module.exports = ViewPack;
