import React, { Component } from 'react';
import { cyan500, grey100 } from 'material-ui/styles/colors';
import RaisedButton from 'material-ui/RaisedButton';
import './GetStart.css';
import { browserHistory } from 'react-router';

class GetStart extends Component {
  render() {
    const top = (
        <div
          className="row center-xs top"
          style={{
            backgroundColor: cyan500,
          }}
        >
          <div className="col-xs-6">
            <div className="box">
              <h1 className="main-title">EasyLearn</h1>
              <h2 className="main-description">
                結合社群網路、集體智慧與行動學習概念<br />提供互動式的社群行動學習平台
              </h2>
              <RaisedButton label="開始使用" onClick={() => browserHistory.push('/home/')} secondary />
            </div>
          </div>
        </div>
      );

    const bottom = (
        <div className="row center-xs bottom">
          <div className="col-xs-6">
            <div className="box">
              <h3>
                Want to help make this
                <span>
                  project awesome?
                </span>
                <span>
                  Check out our repo.
                </span>
              </h3>
              <RaisedButton
                label="GitHub"
                primary
                href="https://github.com/b4456609/easylearn-web"
              />
            </div>
          </div>
        </div>
      );

    const middle = (
        <div
          className="row center-xs middle"
          style={{
            backgroundColor: grey100,
          }}
        >
          <div className="col-xs-6">
            <div className="box">
              <p>建構一個可便利建立、分享、閱讀、討論、更新懶人包的行動應用軟體，將特定主題的知識藉由社群的共筆、註解、評論等方式達成知識的吸收與散佈，建立一個新型態的行動學習模式。</p>
            </div>
          </div>
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

export default GetStart;
