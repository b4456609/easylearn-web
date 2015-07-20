let React = require('react');
let {
  Styles,
  Paper,
  ClearFix,
  CardHeader,
  CardMedia,
  CardTitle,
  CardText,
  CardActions,
  FlatButton,
  Mixins
} = require('material-ui');

let {
  StyleResizable,
  StylePropable
} = Mixins;

let PackItem= React.createClass({

  propTypes: {
    pack: React.PropTypes.object,
  },
  mixins: [
    StylePropable, StyleResizable
  ],
  getInitialState() {
    return {
      zDepth: 1
    };
  },

  getStyles: function() {
    let styles = {
      paper: {
        width: '100%',
        marginBottom: 8,
        marginLeft: 0,
        marginRight: 0,
        WebkitTouchCallout: 'none',
        WebkitUserSelect: 'none',
        KhtmlUserSelect: 'none',
        MozUserSelect: 'none',
        MsUserSelect: 'none',
        userSelect: 'none',
      },
      paperWhenMedium:{
        width: '48%',
        float: 'left',
        marginBottom: 24,
        marginLeft: '1%',
        marginRight: '1%',
      },
      paperWhenLarge:{
        width: '31.3%',
        float: 'left',
        marginBottom: 24,
        marginLeft: '1%',
        marginRight: '1%',
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

    if(this.isDeviceSize(StyleResizable.statics.Sizes.MEDIUM)){
      styles.paper = this.mergeStyles(styles.paper, styles.paperWhenMedium);
    }

    if(this.isDeviceSize(StyleResizable.statics.Sizes.LARGE)){
      styles.paper = this.mergeStyles(styles.paper, styles.paperWhenLarge);
    }

    return styles;
  },

  render: function() {
    let styles = this.getStyles();
    return (
      <Paper style={styles.paper} zDepth={this.state.zDepth} onMouseOver={this._onMouseOver} onMouseOut={this._onMouseOut} onMouseEnter={this.props.onMouseEnter} onClick={this.props.onClick}>
        <CardMedia overlay={<CardTitle title={this.props.pack.name} />}>
          <img src="img/IMG_5687.jpg"/>
        </CardMedia>
        <CardText>
          {this.props.pack.description}
        </CardText>
        <CardActions>
          <FlatButton label="Action1"/>
          <FlatButton label="Action2"/>
        </CardActions>
      </Paper>
    );
  },

  _onMouseOver() {
    this.setState({
      zDepth: 3
    });
  },

  _onMouseOut() {
    this.setState({
      zDepth: 1
    });
  }

});

module.exports =PackItem;
