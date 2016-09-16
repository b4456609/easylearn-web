import React from 'react';
import { connect } from 'react-redux';
import PackCard from './components/PackCard';


const FolderView = ({ pack }) => {
  const packs = (pack.map(
    i => (
      <PackCard key={i.id} name={i.name} description={i.description} id={i.id} />
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


export default connect(
  (state, ownProps) => {
    if(!ownProps.param) return {pack:[]}
    const folderId = ownProps.param.id;
    const folder = state.folder.find(i => i.id === folderId);
    const packArray = folder.pack.map(
      i=>(
          state.pack.find(pack=>pack.id===i)
      )
    );

    return {
      pack: packArray,
    };
  }
)(FolderView);
