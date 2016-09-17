import { SHOW_DIALOG } from '../actions';
const initialState = {
  modalType: null,
  modalProps: null,
};

const dialog = (state = initialState, action) => {
  switch (action.type) {
    case SHOW_DIALOG:
      return {
        modalType: action.modalType,
        modalProps: action.modalProps,
      };
    case 'HIDE_DIALOG':
      return initialState;
    default:
      return state;
  }
};

export default dialog;
