export function simpleNotify(msg) {
  const snackbarContainer = document.querySelector('#easylearn-toast');
  snackbarContainer.MaterialSnackbar.showSnackbar({ message: msg });
}
