import React from 'react';
import './NotFound.css';

const NotFound = () => (
  <div className="mdl-grid" id="notfound-layout">
    <div className="mdl-cell mdl-cell--4-col mdl-cell--4-offset-desktop mdl-cell--2-offset-tablet">
      <h1 id="notfound-title" className="mdl-typography--text-center">404</h1>
    </div>
    <div className="mdl-cell mdl-cell--4-col mdl-cell--4-offset-desktop mdl-cell--2-offset-tablet mdl-card mdl-shadow--2dp" id="notfound-card">
      <div className="mdl-card__title mdl-card--expand">
        <h1 className="mdl-card__title-text">抱歉!<br /> 我們找不到這個網頁 :(</h1>
      </div>
      <div className="mdl-card__actions mdl-card--border">
        <a
          href="/"
          className="mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect"
        >
          繼續瀏覽Easylearn
        </a>
      </div>
    </div>
    <style>{"body{background-color: rgb(0,150,136)!important}"}</style>
  </div>
);


export default NotFound;
