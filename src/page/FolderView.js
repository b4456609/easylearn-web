import React from 'react';
import { connect } from 'react-redux';
import PackCard from './components/PackCard';

const FolderView = ({ pack, folderId, loading }) => {
  if (loading) {
    return (<div className="mdl-spinner mdl-js-spinner is-active" />);
  }
  let content;
  if (pack.length !== 0) {
    content = (pack.map(
      i => (
        <PackCard
          key={i.id}
          name={i.name}
          description={i.description}
          id={i.id}
          folderId={folderId}
          imgUrl={i.coverFilename}
          isPublic={i.isPublic}
        />
      )
    ));
  } else {
    content = (
      <div style={{ width: '100%', margin: '36px', textAlign: 'center', color: 'grey' }}>
        <i
          className="material-icons"
          style={{
            fontSize: '200px'
          }}
        >
          book
        </i>
        <h5>
          移動懶人包到此資料夾
        </h5>
      </div>
    );
  }
  return (
    <div className="mdl-grid">
      {content}
    </div>
  );
};

FolderView.propTypes = {
  loading: React.PropTypes.boolean,
  pack: React.PropTypes.array,
  folderId: React.PropTypes.string,
};


export default connect(
  (state, ownProps) => {
    if (state.app.packFetch === true || state.app.folderFetch === true) {
      return {
        loading: true
      };
    }
    const folderId = ownProps.params.id || 'all';
    const folder = state.folder.find(i => i.id === folderId);
    const packArray = folder.pack.map(
      item => state.pack.find(
        p => p.id === item
      )
    );
    return {
      pack: packArray,
      folderId,
    };
  }
)(FolderView);
