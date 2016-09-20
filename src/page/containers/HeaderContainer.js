import { connect } from 'react-redux';
import Header from '../components/Header';
import { removeFolder, showDialog } from '../../actions';


function mapStateToProps(state, ownProps) {
  let title = '';
  let folderId = null;
  let packId = null;
  let versionId = null;
  if (!ownProps.location.pathname === '/') {
    title = 'All';
    folderId = 'all';
  } else if (ownProps.location.pathname === '/new-pack') {
    title = '新增懶人包';
  } else if (ownProps.location.pathname.indexOf('/pack') !== -1) {
    title = ownProps.params.id && state.pack.find(i => i.id === ownProps.params.id).name;
    packId = ownProps.params.id;
    let pack = state.pack.find(i => i.id === ownProps.params.id);
    pack.version.sort((a, b) => b.createTime - a.createTime);
    versionId = ownProps.params.versionId || pack.version[0].id;
  } else if (ownProps.location.pathname.indexOf('/folder') !== -1) {
    title = ownProps.params.id && state.folder.find(i => i.id === ownProps.params.id).name;
    folderId = ownProps.params.id;
  } else {
    title = 'Easylearn';
  }
  return {
    initState: state.app.initState,
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
    showListVersionDialog: () => {
      dispatch(showDialog('LIST_VERSION_DIALOG'));
    },
  };
}


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Header);
