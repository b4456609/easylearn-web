let React = require('react');
let FolderStore = require('../stores/folder-store.jsx');
let {
  LeftNav,
  MenuItem
} = require('material-ui');

function getState() {
  return {
    folder: FolderStore.getFolderMenu()
  }
}

let AppLeftNav = React.createClass({

  getInitialState: function() {
    return {
      folder: []
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

  render: function() {
    let menuItems = [
      {
        route: 'new-pack',
        text: '新增懶人包'
      }, {
        route: 'delete-pack',
        text: '刪除懶人包'
      }, {
        route: 'folder-manerger',
        text: '管理資料夾'
      }, {
        type: MenuItem.Types.SUBHEADER,
        text: '資料夾'
      },
    ];

    for(let item of this.state.folder){
      menuItems.push(item);
    }
    return (
      <LeftNav menuItems={menuItems}/>
    );
  }

});

module.exports = AppLeftNav;
