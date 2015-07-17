let React = require('react');
let {
  Paper,
  List,
  ListItem,
  ClearFix,
  Styles,
  ListDivider,
  Dialog,
  SelectField
} = require('material-ui');

let FolderStore= require('../../../stores/folder-store.jsx');

let {Colors} = Styles;

function getState() {
  return {
    folder: FolderStore.getFolderIdName(),
    folderId: FolderStore.getViewFolderId()
  };
}

let PackInfo = React.createClass({

  getInitialState: function() {
    return {
      folder: FolderStore.getFolderIdName(),
      folderId: FolderStore.getViewFolderId(),
      selectedId: undefined
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
        float: 'right',
        width: '250px'
      }
    };
  },

  getSecondaryText(text){
    return(
      <p>
        <span style={{color: Colors.darkBlack}}>{text}</span>
      </p>
    );
  },

  render: function() {
    let styles = this.getStyles();
    let moveDialog = this.getMoveDialog();

    if(this.props.pack != null){
      let publicStatus = '不公開';
      if(this.props.pack.is_public){
        publicStatus = '公開';

      }
      return (
        <ClearFix>
        <Paper className="pack-paper" style={styles.paper} zDepth={1}>

          <List>
          <ListItem primaryText="名稱" secondaryText={           this.getSecondaryText(this.props.pack.name)}/>
          <ListItem primaryText="描述" secondaryText={            this.getSecondaryText(this.props.pack.description)}/>
          <ListItem primaryText="建立時間" secondaryText={            this.getSecondaryText(this.props.pack.create_time)}/>
          <ListItem primaryText="狀態" secondaryText={this.getSecondaryText(publicStatus)}/>
          <ListDivider />
          </List>
          <List subheader="管理此懶人包">
          <ListItem primaryText="移至..." onClick={this._onPackMove}/>
          <ListItem primaryText="移除" onClick={this._onPackDelete}/>
         </List>
        </Paper>
        {moveDialog}
      </ClearFix>
      );
    }
    else {
      return null;
    }
  },

  getMoveDialog(){
    let standardActions = [
      {
        text: '取消'
      }, {
        text: '送出',
        onTouchTap: this._handleMoveDialogSubmit
      }
    ];

    return (
      <Dialog actions={standardActions} ref="moveDialog" title="移動懶人包">
        <div  style={{height: '250px'}}>
      <SelectField
        value={this.state.selectedId}
        ref="select"
        floatingLabelText="選擇資料夾"
        menuItems={this.state.folder}
        onChange={this._handleSelectValueChange} />
      </div>
      </Dialog>
    );
  },

  _handleSelectValueChange(e){
    let id = e.target.value.payload;
    this.setState({selectedId:id});
  },

  _handleMoveDialogSubmit(){
    console.log(this.state.selectedId, this.props.pack.id, this.state.folderId);
  },

  _onPackMove(){
    this.refs.moveDialog.show();
  },

  _onPackDelete(id){
    console.log('_onPackDelete',id);
  }

});

module.exports = PackInfo;
