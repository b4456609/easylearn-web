import React from 'react';
import { connect } from 'react-redux';
import { hideDialog, movePackToFolder } from '../../actions';

class MovePackDialog extends React.Component {
  constructor(props) {
    super(props);
    this.state = { value: 1 };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event, index, value) {
    this.setState({ value });
  }

  render() {
    return (
      <Dialog
        title="移動懶人包到..."
        actions={[
          <FlatButton
            label="取消"
            primary
            onClick={() => {
              this.props.dispatch(hideDialog());
            }}
          />,
          <FlatButton
            label="送出"
            primary
            onClick={() => {
              this.props.dispatch(movePackToFolder(this.props.modalProps.id, this.state.value));
              this.props.dispatch(hideDialog());
            }}
          />,
        ]}
        modal={false}
        open
      >
        <SelectField value={this.state.value} onChange={this.handleChange}>
        {this.props.folder.map((f) => {
          // if (f.pack.indexOf(this.props.modalProps.id) === -1)
          return (<MenuItem key={f.id} value={f.id} primaryText={f.name} />);
        }
        )}
        </SelectField>
      </Dialog>
    );
  }
}

export default connect(
  state => ({
    modalProps: state.dialog.modalProps,
    folder: state.folder,
  })
)(MovePackDialog);
