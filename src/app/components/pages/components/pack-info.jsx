let React = require('react');
let {
  Paper,
  List,
  ListItem,
  Styles,
  ListDivider,
  Dialog,
  RadioButton,
  RadioButtonGroup
} = require('material-ui');

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
          <RadioButton disabled={true} id={item.id} label={item.name} style={{
            marginBottom: 16
          }} value={item.id}/>
        );
      } else {
        return (
          <RadioButton id={item.id} label={item.name} style={{
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

  render: function() {
    let styles = this.getStyles();
    let moveDialog = this.getCopyMoveDialog();
    let manageMenu = this.getManageMenu();

    if (this.props.pack != null) {
      let publicStatus = '不公開';
      if (this.props.pack.is_public) {
        publicStatus = '公開';

      }
      return (
        <div>
          <Paper className="pack-paper" style={styles.rightBlock} zDepth={1}>

            <List>
              <ListItem primaryText="名稱" secondaryText={this.getSecondaryText(this.props.pack.name)}/>
              <ListItem primaryText="描述" secondaryText={this.getSecondaryText(this.props.pack.description)}/>
              <ListItem primaryText="建立時間" secondaryText={this.getSecondaryText(this.props.pack.create_time)}/>
              <ListItem primaryText="狀態" secondaryText={this.getSecondaryText(publicStatus)}/>
              <ListDivider/>
            </List>
            {manageMenu}
          </Paper>
          {moveDialog}
        </div>
      );
    } else {
      return null;
    }
  },

  _handleMoveDialogSubmit() {
    let target = this.refs.folderRadio.getSelectedValue();
    console.log(target, this.props.pack.id, this.state.folderId);
    //user not select
    if(target === ''){
      console.log(null);
    }

    //copy action system folder
    if(this.state.folderId === 'allPackId'){
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

  _onPackDelete(id) {
    console.log('_onPackDelete', id);
  }

});

module.exports = PackInfo;
