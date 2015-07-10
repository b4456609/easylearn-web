var React = require('react');
var PackStore = require('../../stores/pack-store');

let {
  Styles,
  Paper,
  ClearFix
} = require('material-ui');

function getViewPackState() {
  return {
    pack: PackStore.getViewVersion()
  };
}

var ViewPack = React.createClass({

  getInitialState: function() {
    return getViewPackState();
  },

  componentDidMount: function() {
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
      root: {
        padding: '16px'
      },
      title: {
        lineHeight: '1.25em',
        fontSize: '25px',
        paddingTop: '6px',
      },
      content: {
        paddingTop: '6px',
        fontSize: '16px'
      }
    }
  },

  render: function() {
    let styles = this.getStyles();
    return (
      <Paper onClick={this._onClick} style={styles.paper} zDepth={1}>
        <div style={styles.root}>
          <h1 style={styles.title}>
            {this.state.pack.title}
          </h1>
          <div id="content" dangerouslySetInnerHTML={{__html: this.state.pack.version.content}} style={styles.content}/>
        </div>
      </Paper>
    );
  }

});

module.exports = ViewPack;
