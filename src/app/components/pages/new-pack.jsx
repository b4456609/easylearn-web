'use strict';
var React = require('react');
let FullWidthSection = require('../full-width-section');
let {
  Mixins,
  Styles,
  TextField,
  Paper,
  ClearFix,
  Checkbox,
  RaisedButton
} = require('material-ui');

let {
  Spacing
} = Styles;
let {
  StyleResizable
} = Mixins;

function editor() {
  $('#eg-basic').editable({
    inlineMode: false
  });
}
var newPack = React.createClass({

  mixins: [
    StyleResizable, React.addons.LinkedStateMixin
  ],

  getStyles() {
    let styles = {
      block: {
        padding: '8px',
        lineHeight: '20px'
      },
      group: {
        marginBottom: 32
      },
      textfield: {
        display: 'block',
        marginTop: 10
      },
      checkbox: {
        marginTop: 20
      },
      button: {
        marginTop: 30
      },
      editor: {
        marginTop: 30
      },
      left: {
        float: 'left'
      },
      submitBtn:{
        float:'right'
      }
    };

    return styles;
  },

  componentDidMount: function() {
    if (this.isMounted()) {
      editor();
    }
  },

  render: function() {
    let styles = this.getStyles();

    return (
      <ClearFix>
        <Paper zDepth={1}>
          <div style={styles.block}>
            <div style={styles.left}>
            <TextField floatingLabelText="標題" style={styles.textfield}/>
            <TextField floatingLabelText="描述" multiLine={true} style={styles.textfield}/>
            <TextField floatingLabelText="標籤" style={styles.textfield}/>
            <Checkbox label="公開懶人包" name="checkboxName1" style={styles.checkbox} value="checkboxValue1"/>
            <RaisedButton label="選擇封面照片" secondary={true} style={styles.button}/>
            </div>

            <ClearFix>
            <RaisedButton label="完成" primary={true} style={styles.submitBtn}/>
            </ClearFix>

            <ClearFix>
            <div id="eg-basic" style={styles.editor}></div>
            </ClearFix>

          </div>
        </Paper>
      </ClearFix>
    );
  }

});

module.exports = newPack;
