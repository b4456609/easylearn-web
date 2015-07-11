var React = require('react');
let {
  Table,
  RaisedButton,
  ClearFix,
  Paper,
  Snackbar
} = require('material-ui');

let PackStore = require('../../stores/pack-store.jsx');
let EasylearnActions = require('../../action/easylearn-actions.jsx');

function getData() {
  return {rowData: PackStore.getDeleteList()};
}

var DeletePack = React.createClass({

  getInitialState: function() {
    return {
      rowData: PackStore.getDeleteList(),
      selected: [],
      message: ''
    };
  },

  componentDidMount: function() {
    PackStore.addChangeListener(this._onChange);
  },

  componentWillUnmount: function() {
    PackStore.removeChangeListener(this._onChange);
  },

  _onChange: function() {
    this.setState(getData());
  },

  render: function() {


    // Column configuration
    let headerCols = {
      name: {
        content: '名稱',
        tooltip: 'Pack name'
      },
      description: {
        content: '描述',
        tooltip: 'Pack description'
      },
      create_time: {
        content: '建立時間',
        tooltip: 'Pack Create Time'
      }
    };

    let colOrder = [
      'name', 'description', 'create_time'
    ];

    let bottonStyle = {
      float: 'right',
      marginTop: '8px',
      marginRight: '8px'
    };

    let standardActions = [
      { text: '取消' },
      { text: '確定', onTouchTap: this._onDialogSubmit, ref: 'submit' }
    ];

    return (
      <Paper>
        <div>
          <ClearFix>
            <RaisedButton onTouchTap={this._onDeleteClick} style={bottonStyle} primary={true} label="刪除懶人包" />
          </ClearFix>
          <Table
            headerColumns={headerCols}
            columnOrder={colOrder}
            rowData={this.state.rowData}
            fixedHeader={true}
            fixedFooter={false}
            stripedRows={true}
            showRowHover={true}
            selectable={true}
            multiSelectable={true}
            canSelectAll={false}
            deselectOnClickaway={false}
            onRowSelection={this._onRowSelection} />
        </div>
        <Snackbar
          ref="snackbar"
          message={this.state.message}
          action="undo"
          autoHideDuration={5000}
          onActionTouchTap={this._handleAction}/>
      </Paper>
    );
  },

  _handleAction: function () {
    EasylearnActions.redoDeletePack();
  },

  _onRowSelection: function (selected) {
    console.log(selected);
    this.setState({selected: selected});
  },

  _onDeleteClick: function () {
    let selectedId = [];
    for(let item of this.state.selected){
      selectedId.push(this.state.rowData[item].id);
    }

    EasylearnActions.deletePack(selectedId);

    this.setState({message :'成功刪除' + this.state.selected.length + '個懶人包'});
    this.refs.snackbar.show();
  },

  _onDialogSubmit: function () {
    console.log(this.state.selected);
  }

});

module.exports = DeletePack;
