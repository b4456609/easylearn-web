let React = require('react');
let MoreVertIcon = require('material-ui/lib/svg-icons/navigation/more-vert');
let PageTemplete = require('../page-templete.jsx');

let EasylearnActions = require('../../action/easylearn-actions.jsx');

let {
  Paper,
  List,
  Styles,
  Dialog,
  TextField,
  ListItem,
  IconMenu,
  IconButton,
  FlatButton
} = require('material-ui');
let MenuItem = require('material-ui/lib/menus/menu-item');

let Colors = Styles.Colors;
let FolderStore = require('../../stores/folder-store.jsx');

function getState() {
  return {
    folder: FolderStore.getFolder()
  };
}

let FolderManerger = React.createClass({

  getInitialState: function() {
    return {
      folder: FolderStore.getFolder(),
      renameFolderId: ''
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
      paper: {
        margin: '0 auto',
        marginBottom: 16,
        maxWidth: 300
      },
      btn:{
        width: '100%',
      },
    };
  },

  getRightIconMenu(key) {
    let iconButtonElement = (
      <IconButton tooltip="more" tooltipPosition="bottom-left" touch={true}>
        <MoreVertIcon color={Colors.grey400}/>
      </IconButton>
    );

    return (
      <IconMenu iconButtonElement={iconButtonElement} onChange={this.onChange} onItemTouchTap={this.onItemTouchTap}>
        <MenuItem key={key + 'rename'} primaryText="重新命名"/>
        <MenuItem key={key + 'delete'} primaryText="刪除"/>
      </IconMenu>
    );
  },

  onChange(e, value) {
    console.log(e, value);
  },

  contextMenu: function(e) {
    e.preventDefault();
  },

  onItemTouchTap(e, item) {
    console.log(item);
    let id = item.key;
    if (id.indexOf('rename') !== -1) {
      this.refs.renameDialog.show();
      this.setState({
        renameFolderId: id.substring(0, id.indexOf('rename'))
      });
    } else if (id.indexOf('delete') !== -1) {}
  },

  getUserFolder() {
    let self = this;
    return (this.state.folder.map(function(item) {
      let getMenu = self.getRightIconMenu(item.id);
      if (item.id === 'allPackId')
        return;
      return <ListItem key={item.id} onContextMenu={self.contextMenu} primaryText={item.name} rightIconButton={getMenu}/>
    }));
  },

  getRenameDialog() {
    let standardActions = [
      {
        text: '取消'
      }, {
        text: '送出',
        onTouchTap: this._handleRenameDialogSubmit
      }
    ];

    let style = {
      width: '100%'
    };

    return (
      <Dialog actions={standardActions} ref="renameDialog" title="重新命名">
        <TextField floatingLabelText="資料夾名稱" ref="renameInput" style={style}/>
      </Dialog>
    );
  },

  _handleRenameDialogSubmit() {
    let text = this.refs.renameInput.getValue().trim();
    if (text === '') {
      this.refs.renameInput.focus();
      this.refs.renameInput.setErrorText('名稱不能空白');
    } else {
      this.refs.renameDialog.dismiss();
      EasylearnActions.renameFolder(this.state.renameFolderId, text);
      EasylearnActions.sync();
    }
  },

  getNewFolderDialog() {
    let standardActions = [
      {
        text: '取消'
      }, {
        text: '送出',
        onTouchTap: this._handleNewDialogDialogSubmit
      }
    ];

    let style = {
      width: '100%'
    };

    return (
      <Dialog actions={standardActions} ref="newFolderDialog" title="新增資料夾">
        <TextField floatingLabelText="資料夾名稱" ref="folderText" style={style}/>
      </Dialog>
    );

  },

  _handleNewDialogDialogSubmit(){
    let folderName = this.refs.folderText.getValue().trim();
    if(folderName !== ''){
      EasylearnActions.addFolder(folderName);
      this.refs.newFolderDialog.dismiss();
    }
    else{
      //error handling
      this.refs.folderText.setErrorText('請輸入資料夾名稱');
    }
  },

  _onNewFolderClick: function() {
    this.refs.newFolderDialog.show();
  },

  render: function() {
    let styles = this.getStyles();
    let userFolder = this.getUserFolder();
    let renameDialog = this.getRenameDialog();
    let newFolderDialog = this.getNewFolderDialog();
    return (
      <PageTemplete>
        <Paper style={styles.paper} zDepth={1}>
          <List subheader="系統資料夾">
            <ListItem primaryText="All"/>
          </List>
          <List subheader="使用者資料夾">
            {userFolder}
          </List>
          <FlatButton style={styles.btn} label="新增資料夾" onClick={this._onNewFolderClick} secondary={true}/>
          {renameDialog}
          {newFolderDialog}
        </Paper>
    </PageTemplete>
    );
  }
});

module.exports = FolderManerger;
