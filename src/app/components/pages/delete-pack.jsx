var React = require('react');
let {
  Table,
  RaisedButton,
  ClearFix,
  Paper,
  Dialog
} = require('material-ui');

let PackStore = require('../../stores/pack-store.jsx');

function getData() {
  return {rowData: PackStore.getDeleteList()};
}

var DeletePack = React.createClass({

  getInitialState: function() {
    return {
      fixedHeader: true,
      fixedFooter: false,
      stripedRows: true,
      showRowHover: true,
      selectable: true,
      multiSelectable: true,
      canSelectAll: true,
      deselectOnClickaway: true,
      rowData: PackStore.getDeleteList(),
      selected: []
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
            fixedHeader={this.state.fixedHeader}
            fixedFooter={this.state.fixedFooter}
            stripedRows={this.state.stripedRows}
            showRowHover={this.state.showRowHover}
            selectable={this.state.selectable}
            multiSelectable={this.state.multiSelectable}
            canSelectAll={this.state.canSelectAll}
            deselectOnClickaway={this.state.deselectOnClickaway}
            onCellClick={this._onCellClick}
            onRowSelection={this._onRowSelection} />
        </div>
        <Dialog
          ref="confirmDialog"
          title="Dialog With Standard Actions"
          actions={standardActions}
          actionFocus="submit"
          modal={false}>
          確定要刪除選擇的懶人包?
        </Dialog>
      </Paper>
    );
  },

  _onCellClick: function (owNumber, columnId) {
    console.log('_onCellClick', owNumber, columnId);
  },

  _onRowSelection: function (selected) {
    console.log(selected);
  },

  _onDeleteClick: function () {
    this.refs.confirmDialog.show();
  },

  _onDialogSubmit: function () {
    console.log(this.state.selected);
  }

});

module.exports = DeletePack;
