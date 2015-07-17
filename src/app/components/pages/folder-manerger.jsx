let React = require('react');

let {
  Paper,
  List,
  ListItem,
} = require('material-ui');
let FolderStore = require('../../stores/folder-store.jsx');

function getState() {
  return {
    folder: FolderStore.getFolder(),
  };
}

let FolderManerger = React.createClass({

  getInitialState: function() {
    return getState();
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
        marginBottom: 16,
      },
    };
  },

  getRightMenu(){
    return
  },

  getUserFolder(){
    return (
      this.state.folder.map(function (item) {
          if(item.id === 'allPackId') return;
          return <ListItem key={item.id} primaryText={item.name}/>
      })
    );
  },

  render: function() {

    let styles = this.getStyles();
    let userFolder = this.getUserFolder();
    return (
      <Paper style={styles.paper} zDepth={1}>
        <List subheader="系統資料夾">
          <ListItem primaryText="All"/>
        </List>
        <List subheader="使用者資料夾">
          {userFolder}
        </List>
    </Paper>
    );
  },

});

module.exports = FolderManerger;
