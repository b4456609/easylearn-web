var React = require('react');
let {
  Table,
  RaisedButton,
  ClearFix,
  Paper
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
      canSelectAll: false,
      deselectOnClickaway: true,
      rowData: PackStore.getDeleteList()
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

    let style = {
      float: 'right',
      marginTop: '8px',
      marginRight: '8px'
    };

    return (
      <Paper>
        <div>
          <ClearFix>
            <RaisedButton  style={style} primary={true} label="刪除懶人包" />
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
            onRowSelection={this._onRowSelection} />
        </div>
      </Paper>
    );
  }

});

module.exports = DeletePack;
