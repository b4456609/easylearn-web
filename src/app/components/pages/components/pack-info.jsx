let React = require('react');
let {
  Paper,
  List,
  ListItem,
  ClearFix,
  Styles,
  ListDivider
} = require('material-ui');

let {Colors} = Styles;


let PackInfo = React.createClass({

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

  componentDidMount: function() {
  },

  render: function() {
    let styles = this.getStyles();

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
          <ListItem primaryText="移至..." onClick={this._onPackMove.bind(this, this.props.pack.id)}/>
          <ListItem primaryText="移除" onClick={this._onPackDelete.bind(this, this.props.pack.id)}/>
         </List>
        </Paper>
      </ClearFix>
      );
    }
    else {
      return null;
    }
  },

  _onPackMove(id){
    console.log('_onPackMove',id);
  },

  _onPackDelete(id){
    console.log('_onPackDelete',id);
  }

});

module.exports = PackInfo;
