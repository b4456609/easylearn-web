import React from 'react';
import { connect } from 'react-redux';
import PackCard from './components/PackCard';


const FolderView = ({ pack, folderId }) => {
  const packs = (pack.map(
    i => (
      <PackCard key={i.id} name={i.name} description={i.description}
        id={i.id} folderId={folderId}
      />
    )
  ));

  return (
    <div>
      <div className="row">
        {packs}
      </div>
    </div>
  );
};

FolderView.propTypes = {
  pack: React.PropTypes.array.isRequired,
  folderId: React.PropTypes.string.isRequired,
};


export default connect(
  (state, ownProps) => {
    console.log(JSON.stringify(state));
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
