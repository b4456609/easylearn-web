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
  Mixins,
  Avatar,
  IconButton,
  FloatingActionButton
} = require('material-ui');

let IconMenu = require('material-ui/lib/menus/icon-menu');
let MenuItem = require('material-ui/lib/menus/menu-item');
let MenuDivider = require('material-ui/lib/menus/menu-divider');
let MoreVertIcon = require('material-ui/lib/svg-icons/navigation/more-vert');
let KeyboardArrowRight = require('material-ui/lib/svg-icons/hardware/keyboard-arrow-right');
let FolderStore = require('../../../stores/folder-store.jsx');

let {
  StyleResizable,
  StylePropable
} = Mixins;

function getState() {
  return {
    folderId: FolderStore.getViewFolderId()
  };
}

let PackItem = React.createClass({

  propTypes: {
    pack: React.PropTypes.object
  },
  mixins: [
    StylePropable, StyleResizable
  ],
  getInitialState() {
    return {
      zDepth: 1,
      folderId: FolderStore.getViewFolderId()
    };
  },

  componentDidMount: function() {
    FolderStore.addChangeListener(this._onChange);
  },

  componentWillUnmount: function() {
    FolderStore.removeChangeListener(this._onChange);
  },

  _onChange: function() {
    this.setState(getState());
  },

  getStyles: function() {
    let styles = {
      paper: {
        position: 'relative',
        width: '100%',
        marginBottom: 8,
        marginLeft: 0,
        marginRight: 0,
        WebkitTouchCallout: 'none',
        WebkitUserSelect: 'none',
        KhtmlUserSelect: 'none',
        MozUserSelect: 'none',
        MsUserSelect: 'none',
        userSelect: 'none'
      },
      paperWhenMedium: {
        width: '48%',
        float: 'left',
        marginBottom: 24,
        marginLeft: '1%',
        marginRight: '1%'
      },
      paperWhenLarge: {
        width: '31.3%',
        float: 'left',
        marginBottom: 24,
        marginLeft: '1%',
        marginRight: '1%'
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
        paddingTop: '6px'
      },
      des: {
        paddingTop: '16px',
        margin: 0
      },
      img: {
        maxWidth: '100px',
        maxHeight: '100px'
      },
      menuIcon:{
        position: 'absolute',
        right:0,
        bottom: 8
      },
      floatBtn:{
        position: 'absolute',
        right:30,
        bottom: 45
      }
    };

    if (this.isDeviceSize(StyleResizable.statics.Sizes.MEDIUM)) {
      styles.paper = this.mergeStyles(styles.paper, styles.paperWhenMedium);
    }

    if (this.isDeviceSize(StyleResizable.statics.Sizes.LARGE)) {
      styles.paper = this.mergeStyles(styles.paper, styles.paperWhenLarge);
    }

    return styles;
  },

  getManageMenu() {
    let styles = this.getStyles();
    let iconButtonElement = <IconButton><MoreVertIcon /></IconButton>;

    if (this.state.folderId !== 'allPackId') {
      return (
        <IconMenu
            iconButtonElement={iconButtonElement}
            openDirection="top-left">
          <MenuItem primaryText="複製至..." />
          <MenuItem onClick={this._onPackCopyMove.bind(this, 'move')} primaryText="移至..."/>
          <MenuItem primaryText="移除" />
        </IconMenu>
      );
    }
    return (
      <IconMenu
          iconButtonElement={iconButtonElement}
          openDirection="top-left">
          <MenuItem primaryText="複製至..." />
          <MenuItem primaryText="移除" />
      </IconMenu>
    );
  },

  _onPackCopyMove(action) {
    this.setState({action: action});
    this.refs.moveDialog.show();
  },

  render: function() {
    let styles = this.getStyles();
    let publicInfo = "不公開";
    if (this.props.pack.is_public) {
      publicInfo = "公開";
    }
    let menuIcon = this.getManageMenu();

    //<span style={styles.time}>{this.props.pack.create_time} {this.props.pack.creator_user_name}</span>
    return (
      <Paper onMouseEnter={this.props.onMouseEnter} onMouseOut={this._onMouseOut} onMouseOver={this._onMouseOver} style={styles.paper} zDepth={this.state.zDepth}>
        <div onClick={this.props.onClick}>
          <CardMedia overlay={<CardTitle title={this.props.pack.name} subtitle={this.props.pack.description}/>}>
            <img src="img/IMG_5687.jpg"/>
          </CardMedia>
        </div>

        <CardHeader
          title={this.props.pack.creator_user_name}
          subtitle={this.props.pack.create_time + '  ' + publicInfo}
          avatar={<Avatar src={"http://graph.facebook.com/" + this.props.pack.creator_user_id + "/picture"} style={this.getStyles().userAvatar}/>}/>
        <span style={styles.menuIcon}>{menuIcon}</span>
        <FloatingActionButton style={styles.floatBtn}  onClick={this.props.onClick}>
          <KeyboardArrowRight />
        </FloatingActionButton>
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

module.exports = PackItem;
