import React, { PropTypes } from 'react';
import { browserHistory } from 'react-router';


const FolderList = ({ folder }) => (
  <nav className="mdl-navigation">
    <span className="mdl-navigation__link mdl-color-text--indigo-500" href>資料夾</span>
    {
      folder.map(i =>
        (<a key={i.id} className="mdl-navigation__link"
          onClick={()=>{
            browserHistory.push(`/folder/${i.id}`);
            document.querySelector('.mdl-layout__obfuscator').classList.remove('is-visible');
            document.querySelector('.mdl-layout__drawer').classList.remove('is-visible');
          }}
        >{i.name}</a>)
      )
    }
  </nav>
);

FolderList.propTypes = {
  folder: PropTypes.array.isRequired,
};

export default FolderList;
