import { connect } from 'react-redux';
import Header from '../components/Header';
import { removeFolder, showDialog } from '../../actions';


function mapStateToProps(state, ownProps) {
  let title = '';
  let folderId = null;
  let packId = null;
  let versionId = null;
  let isEdit = false;
  const currentPath = ownProps.location.pathname;
  const currentId = ownProps.params.id;
  if (!currentPath === '/') {
    title = 'All';
    folderId = 'all';
  } else if (currentPath === '/new-pack') {
    title = '新增懶人包';
  } else if (currentPath.indexOf('/pack') !== -1) {
    title = currentId && state.pack.find(i => i.id === currentId).name;
    packId = currentId;
    const pack = state.pack.find(i => i.id === packId);
    pack.version.sort((a, b) => b.createTime - a.createTime);
    versionId = ownProps.params.versionId || pack.version[0].id;
  } else if (currentPath.indexOf('/folder') !== -1) {
    title = currentId && state.folder.find(i => i.id === currentId).name;
    folderId = currentId;
  } else {
    title = 'Easylearn';
  }

  if (ownProps.location.pathname.indexOf('/edit') !== -1) {
    isEdit = true;
  }

  return {
    initState: state.app.initState,
    isEdit,
    title,
    folderId,
    packId,
    versionId,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    removeFolder: (folderId) => {
      dispatch(removeFolder(folderId));
    },
    showListVersionDialog: (versionId) => {
      dispatch(showDialog('LIST_VERSION_DIALOG', { versionId }));
    },
  };
}


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Header);
