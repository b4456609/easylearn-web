let React = require('react');
let Router = require('react-router');
let {
  Paper,
  ListItem,
  List
} = require('material-ui');
let EasyLearnActions = require('../../../action/easylearn-actions.jsx');

let Navigation = Router.Navigation;

let VersionInfo = React.createClass({

  mixins: [Navigation],

  _onVersionTapTouch: function(id, e) {
    EasyLearnActions.checkoutVersion(id);
  },

  _onModifiedPackClick: function() {
    this.transitionTo('modified-pack');
  },

  getStyles: function() {
    return {
      versionPaper: {
        float: 'right',
        width: '100%'
      }
    };
  },

  getVersion: function() {
    let self = this;
    let items = this.props.versionInfo.map(function(item, i) {
      return (
        <ListItem key={i} onClick={self._onVersionTapTouch.bind(self, item.id)} primaryText={item.text}/>
      );
    });

    let result = (
      <List subheader="懶人包版本">
        <ListItem onClick={this._onModifiedPackClick.bind(this, this.props.currentVersionId)} primaryText='修改此懶人包'/>
        {items}
      </List>
    );

    return result;
  },

  render: function() {
    let styles = this.getStyles();
    let version = this.getVersion();
    return (
      <Paper style={styles.versionPaper} zDepth={1}>
        {version}
      </Paper>
    );
  }

});

module.exports = VersionInfo;
