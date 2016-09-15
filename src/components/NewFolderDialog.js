import React, {PropTypes} from 'react'
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import {connect} from 'react-redux'
import {hideDialog, addFolder} from '../actions'
import TextField from 'material-ui/TextField'

const mapStateToProps = (state) => {
    return {modalProps: state.dialog.modalProps}
}

const NewFolderDialog = ({modalProps,dispatch}) => {
  return(
    <Dialog
      title="新增資料夾"
      actions={[
        <FlatButton
          label="取消"
          primary={true}
          onClick={()=>{
            dispatch(hideDialog())
          }}
          />,
        <FlatButton
          label="送出"
          primary={true}
          onClick={()=>{
            dispatch(addFolder(document.getElementById('new').value));
            dispatch(hideDialog())
          }}
          />,
      ]}
      modal={false}
      open={true}
      >
      <TextField
        id="new"
        defaultValue="未命名資料夾"
      />
    </Dialog>
  )
}

export default connect(
  mapStateToProps
)(NewFolderDialog)
