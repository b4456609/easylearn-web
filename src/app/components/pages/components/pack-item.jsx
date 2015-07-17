let React = require('react');
let {
  Styles,
  Paper,
  ClearFix
} = require('material-ui');

let PackItem= React.createClass({

  propTypes: {
    pack: React.PropTypes.object,
  },

  getInitialState() {
    return {
      zDepth: 1
    };
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
      }
    };
  },

  render: function() {
    let styles = this.getStyles();
    return (
      <Paper style={styles.paper} zDepth={this.state.zDepth} onMouseOver={this._onMouseOver} onMouseOut={this._onMouseOut} onMouseEnter={this.props.onMouseEnter} onClick={this.props.onClick}>
        <div style={styles.paperPadding}>
          <ClearFix>
            <div style={styles.left}>
              <img src={this.props.pack.img} style={styles.img}/></div>
            <div style={styles.right}>
              <h1 style={styles.title}>
                {this.props.pack.name}
              </h1>
              <p style={styles.des}>
                {this.props.pack.description}</p>
            </div>
          </ClearFix>
        </div>
      </Paper>
    );
  },

  _onMouseOver() {
    this.setState({
      zDepth: 2
    });
  },

  _onMouseOut() {
    this.setState({
      zDepth: 1
    });
  }

});

module.exports =PackItem;
