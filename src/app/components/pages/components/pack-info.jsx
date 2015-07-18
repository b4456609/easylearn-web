let React = require('react');
let {
  List,
  Paper,
  Styles,
  Dialog,
  Snackbar,
  ListItem,
  ListDivider,
  RadioButton,
  RadioButtonGroup
} = require('material-ui');
let InfoOutlineIcon = require('material-ui/lib/svg-icons/action/info-outline');
let Menu = require('material-ui/lib/menus/menu');
let MenuItem = require('material-ui/lib/menus/menu-item');
let MenuDivider = require('material-ui/lib/menus/menu-divider');

let EasylearnActions = require('../../../action/easylearn-actions.jsx');
let FolderStore = require('../../../stores/folder-store.jsx');

let {
  Colors
} = Styles;

function getState() {
  return {
    folder: FolderStore.getFolderIdName(),
    folderId: FolderStore.getViewFolderId()
  };
}

let PackInfo = React.createClass({

  getInitialState: function() {
    return {
      action: '',
      folder: FolderStore.getFolderIdName(),
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
    return {
      rightBlock: {
        position: 'fixed',
        right: 50,
        width: 250
      },
      center:{
        textAlign: 'center',
        marginTop: 16,
        marginBottom: 16
      },
      icon: {
        height:"150",
        width:"150",
      }
    };
  },

  getSecondaryText(text) {
    return (
      <p>
        <span style={{
          color: Colors.darkBlack
        }}>{text}</span>
      </p>
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
      EasylearnActions.deletePackInAllFolders(this.props.pack.id)
    }
    else{
      EasylearnActions.deletePackInFolder(this.props.pack.id, this.state.folderId)
    }
    this.refs.deleteDialog.dismiss();
  },

  getManageMenu(){
    let copyAction = null;
    //
    if(this.state.folderId !== 'allPackId'){
      copyAction = (
        <ListItem onClick={this._onPackCopyMove.bind(this, 'move')}
          primaryText="移至..."/>
      );
    }

    return (
      <List subheader="管理此懶人包">
        <ListItem onClick={this._onPackCopyMove.bind(this, 'copy')} primaryText="複製至..."/>
        {copyAction}
        <ListItem onClick={this._onPackDelete} primaryText="移除"/>
      </List>
    );
  },

  getSnackBar(){
    return (<Snackbar
      ref="snackbar"
      message={this.state.message}
      autoHideDuration={5000}/>);
  },

  render: function() {
    let styles = this.getStyles();
    let moveDialog = this.getCopyMoveDialog();
    let manageMenu = this.getManageMenu();
    let snackBar = this.getSnackBar();
    let deleteDialog = this.getDeleteDialog();

    if (this.props.pack != null) {
      let publicStatus = '不公開';
      if (this.props.pack.is_public) {
        publicStatus = '公開';

      }
      return (
        <div>
          <Paper className="pack-paper" style={styles.rightBlock} zDepth={1}>
            <List>
              <ListItem key={this.props.pack.id + 1} primaryText="名稱" secondaryText={this.getSecondaryText(this.props.pack.name)}/>
              <ListItem key={this.props.pack.id + 2} primaryText="描述" secondaryText={this.getSecondaryText(this.props.pack.description)}/>
              <ListItem key={this.props.pack.id + 3} primaryText="建立時間" secondaryText={this.getSecondaryText(this.props.pack.create_time)}/>
              <ListItem key={this.props.pack.id + 4} primaryText="狀態" secondaryText={this.getSecondaryText(publicStatus)}/>
              <ListDivider/>
            </List>
            {manageMenu}
          </Paper>
          {moveDialog}
          {deleteDialog}
          {snackBar}
        </div>
      );
    } else {
      return (
        <Paper className="pack-paper" style={styles.rightBlock} zDepth={1}>
          <div style={styles.center}>
        <InfoOutlineIcon color={Colors.cyan500} style={styles.icon}/>
        <p>滑鼠移到懶人包上，即可觀看詳細資訊</p>
        </div>
      </Paper>)
    }
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

module.exports = PackInfo;
