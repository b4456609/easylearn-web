import React from 'react';
import { connect } from 'react-redux';
import { hideDialog, removePack } from '../../actions';

class RemovePackDialog extends React.Component {
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
        title="刪除懶人包"
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
              this.props.dispatch(removePack(this.props.modalProps.id));
              this.props.dispatch(hideDialog());
            }}
          />,
        ]}
        modal={false}
        open
      >
        {'確定要刪除 "'}{this.props.modalProps.name}{'"？'}
      </Dialog>
    );
  }
}

export default connect(
  state => ({
    modalProps: state.dialog.modalProps,
    folder: state.folder,
  })
)(RemovePackDialog);
