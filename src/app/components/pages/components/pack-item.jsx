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
  FloatingActionButton,
  RadioButton,
  RadioButtonGroup,
  Dialog,
  Snackbar,
} = require('material-ui');

let IconMenu = require('material-ui/lib/menus/icon-menu');
let MenuItem = require('material-ui/lib/menus/menu-item');
let MenuDivider = require('material-ui/lib/menus/menu-divider');
let MoreVertIcon = require('material-ui/lib/svg-icons/navigation/more-vert');
let KeyboardArrowRight = require('material-ui/lib/svg-icons/hardware/keyboard-arrow-right');
let FolderStore = require('../../../stores/folder-store.jsx');
let EasylearnActions = require('../../../action/easylearn-actions.jsx');

let {
  StyleResizable,
  StylePropable
} = Mixins;

function getState() {
  return {
    folder: FolderStore.getFolderIdName(),
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
      action: '',
      folder: FolderStore.getFolderIdName(),
      zDepth: 1,
      folderId: FolderStore.getViewFolderId(),
      message: ''
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
        position: 'relative',
        width: '48%',
        float: 'left',
        marginBottom: 24,
        marginLeft: '1%',
        marginRight: '1%'
      },
      paperWhenLarge: {
        position: 'relative',
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

    // if (this.isDeviceSize(StyleResizable.statics.Sizes.LARGE)) {
    //   styles.paper = this.mergeStyles(styles.paper, styles.paperWhenLarge);
    // }

    if(window.innerWidth > 990){
        styles.paper = styles.paperWhenLarge;

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
          <MenuItem primaryText="複製至..."  onClick={this._onPackCopyMove.bind(this, 'copy')}/>
          <MenuItem onClick={this._onPackCopyMove.bind(this, 'move')} primaryText="移至..."/>
          <MenuItem primaryText="移除" onClick={this._onPackDelete}/>
        </IconMenu>
      );
    }
    return (
      <IconMenu
          iconButtonElement={iconButtonElement}
          openDirection="top-left">
          <MenuItem primaryText="複製至..."  onClick={this._onPackCopyMove.bind(this, 'copy')}/>
          <MenuItem primaryText="移除" onClick={this._onPackDelete}/>
      </IconMenu>
    );
  },

  getCopyMoveDialog() {
    let self = this;
    let standardActions = [
      {
        text: '取消'
      }, {
        text: '送出',
        onTouchTap: this._handleMoveDialogSubmit
      }
    ];
    //disable current folder item
    let RadioItem = this.state.folder.map(function(item) {
      if (self.state.folderId === item.id) {
        return (
          <RadioButton disabled={true} key={item.id} label={item.name} style={{
            marginBottom: 16
          }} value={item.id}/>
        );
      } else {
        return (
          <RadioButton key={item.id} label={item.name} style={{
            marginBottom: 16
          }} value={item.id}/>
        );
      }
    });
    //dialog title
    let title;
    if(this.state.action === 'copy'){
      title = '複製懶人包';
    }  else{
      title = '移動懶人包';
    }

    return (
      <Dialog actions={standardActions} ref="moveDialog" title={title}>
        <RadioButtonGroup name="folder-choose" ref="folderRadio">
          {RadioItem}
        </RadioButtonGroup>
      </Dialog>
    );
  },

  getDeleteDialog(){
    //no props no need to render
    if(!this.props.pack) return null;

    let self = this;
    let standardActions = [
      {
        text: '取消'
      }, {
        text: '確定',
        onTouchTap: this._handleDeleteDialogSubmit
      }
    ];

    let content = (
      <p>
        是否要移除在任何資料夾中的<br></br>"{this.props.pack.name}"?
      </p>
    );

    if(this.state.folderId !== 'allPackId'){
      content = (
        <p>
          是否要移除此資料夾中的<br></br>"{self.props.pack.name}"?
        </p>
      );
    }

    return (
      <Dialog actions={standardActions} ref="deleteDialog" title="刪除懶人包">
        {content}
      </Dialog>
    );
  },


  _onPackDelete() {
    this.refs.deleteDialog.show();
  },

  _handleDeleteDialogSubmit(){
    if(this.state.folderId === 'allPackId'){
      EasylearnActions.deletePackInAllFolders(this.props.pack.id);
      EasylearnActions.sync();
    }
    else{
      EasylearnActions.deletePackInFolder(this.props.pack.id, this.state.folderId)
      EasylearnActions.sync();
    }
    this.refs.deleteDialog.dismiss();
  },

  _onPackCopyMove(action) {
    this.setState({action: action});
    this.refs.moveDialog.show();
  },

  getSnackBar(){
    return (<Snackbar
      ref="snackbar"
      message={this.state.message}
      autoHideDuration={5000}/>);
  },


  render: function() {
    let styles = this.getStyles();
    let publicInfo = "不公開";
    if (this.props.pack.is_public) {
      publicInfo = "公開";
    }
    let menuIcon = this.getManageMenu();
    let moveDialog = this.getCopyMoveDialog();
    let snackBar = this.getSnackBar();
    let deleteDialog = this.getDeleteDialog();

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
        {moveDialog}
        {deleteDialog}
        {snackBar}
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
  },

  _handleMoveDialogSubmit() {
    let target = this.refs.folderRadio.getSelectedValue();
    console.log(target, this.props.pack.id, this.state.folderId);
    //user not select
    if(target === ''){
      console.log(null);
      this.setState({message: '請選擇項目'});
      this.refs.snackbar.show();
    }
    //copy action system folder
    else if(this.state.action === 'copy'){
      EasylearnActions.copyPack(this.props.pack.id, target);
      EasylearnActions.sync();
      this.refs.moveDialog.dismiss();
    }
    else{
      EasylearnActions.movePack(this.props.pack.id, this.state.folderId, target);
      EasylearnActions.sync();
      this.refs.moveDialog.dismiss();
    }
  },

  _onPackCopyMove(action) {
    this.setState({action: action});
    this.refs.moveDialog.show();
  },

});

module.exports = PackItem;
