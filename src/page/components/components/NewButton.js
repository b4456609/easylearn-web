import React, { PropTypes } from 'react';
import { browserHistory } from 'react-router';


const NewButton = ({ pack, folderId, showDialog }) => (
  <div style={{ textAlign: 'center' }}>
    <button
      id="demo-menu-lower-right"
      className="mdl-button mdl-js-button mdl-button--raised"
    >
      新增
    </button>
    <ul
      className="mdl-menu mdl-menu--bottom-left mdl-js-menu mdl-js-ripple-effect"
      htmlFor="demo-menu-lower-right"
    >
      <li className="mdl-menu__item" onClick={()=>{
        browserHistory.push('/new-pack');
        document.querySelector('.mdl-layout__obfuscator').classList.remove('is-visible');
        document.querySelector('.mdl-layout__drawer').classList.remove('is-visible');
        }}>
        新增懶人包
      </li>
      <li className="mdl-menu__item" onClick={()=>{
        showDialog();
        document.querySelector('.mdl-layout__obfuscator').classList.remove('is-visible');
        document.querySelector('.mdl-layout__drawer').classList.remove('is-visible');
        }}>
        新增資料夾
      </li>
    </ul>
  </div>
);

export default NewButton;
