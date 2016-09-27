import React, { Component } from 'react';
import { connect } from 'react-redux';
import './GetStart.css';
import { login } from '../actions';

class GetStart extends Component {
  render() {
    const top = (
      <div className="mdl-grid top mdl-color--primary">
        <div className="mdl-layout-spacer" />
        <div className="mdl-cell mdl-cell--4-col mdl-typography--text-center">
          <h1 className="main-title">EasyLearn</h1>
          <h2 className="main-description">
            結合社群網路、集體智慧與行動學習概念<br />提供互動式的社群行動學習平台
          </h2>
          <button
            className="mdl-button mdl-js-button mdl-button--raised mdl-button--colored"
            onClick={() => { this.props.dispatch(login()); }}
            style={{
              backgroundColor: '#3B5998',
            }}
          >
            Login With Facebook
          </button>
        </div>
        <div className="mdl-layout-spacer" />
      </div>
      );

    const bottom = (
      <div className="mdl-grid bottom">
        <div className="mdl-layout-spacer" />
        <div className="mdl-cell mdl-cell--4-col mdl-typography--text-center">
          <h3>
            Want to help make this
            <span>
              project awesome?
            </span>
            <span>
              Check out our repo.
            </span>
          </h3>
          <a href="https://github.com/b4456609/easylearn-web">
            <button
              className="mdl-button mdl-js-button mdl-button--raised mdl-button--colored"
              onClick={() => { this.props.dispatch(login()); }}
            >
              GitHub
            </button>
          </a>
        </div>
        <div className="mdl-layout-spacer" />
      </div>
      );

    const middle = (
      <div className="mdl-grid middle mdl-color--grey-100">
        <div className="mdl-layout-spacer" />
        <div className="mdl-cell mdl-cell--6-col mdl-typography--text-center">
          <p>建構一個可便利建立、分享、閱讀、討論、更新懶人包的行動應用軟體，
            將特定主題的知識藉由社群的共筆、註解、評論等方式達成知識的吸收與散佈，
            建立一個新型態的行動學習模式。
          </p>
        </div>
        <div className="mdl-layout-spacer" />
      </div>
    );

    return (
      <div>
        {top}
        {middle}
        {bottom}
      </div>
    );
  }
}

export default connect()(GetStart);
