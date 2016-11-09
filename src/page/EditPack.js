import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import React from 'react';
import './EditPack.css';
import { newVersion } from '../actions';
import Editor from './components/components/Editor.js';
import EditorApi from '../api/editor.js';
import mdlUpgrade from '../utils/mdlUpgrade.js';


class NewPack extends React.Component {

  constructor(props, context) {
    super(props, context);
    this.onFinish = this.onFinish.bind(this);
  }

  onFinish() {
    const content = EditorApi.getContent();
    const isPublic = document.querySelector('#public-checkbox').checked;
    const { userId, userName, packId } = this.props;
    const versionId = `version${new Date().getTime()}`;
    this.props.dispatch(newVersion(packId, versionId, content, userId, userName, isPublic));
    browserHistory.push(`/pack/${packId}/${versionId}`);
  }

  render() {
    return (
      <div>
        <div className="mdl-grid">
          <div
            className="mdl-cell--12-col
            mdl-cell--10-col-desktop mdl-cell--1-offset-desktop"
          />
        </div>
        <div
          className="mdl-grid mdl-grid--no-spacing"
        >
          <div
            className="mdl-cell mdl-cell--12-col
            mdl-cell--10-col-desktop mdl-cell--1-offset-desktop"
          >
            <Editor content={this.props.content} />
          </div>
        </div>
        <div className="mdl-grid">
          <div
            className="mdl-cell--12-col
            mdl-cell--5-col-desktop mdl-cell--1-offset-desktop verticle-center"
          >
            <label
              className="mdl-checkbox mdl-js-checkbox mdl-js-ripple-effect"
              htmlFor="public-checkbox"
            >
              <input
                type="checkbox"
                id="public-checkbox"
                className="mdl-checkbox__input"
              />
              <span className="mdl-checkbox__label">公開此懶人包</span>
            </label>
          </div>
          <div
            className="mdl-cell--12-col
            mdl-cell--5-col-desktop mdl-typography--text-right"
            id="finish-btn"
          >
            <button
              className="mdl-button mdl-js-button
              mdl-button--raised mdl-js-ripple-effect mdl-button--accent"
              onClick={this.onFinish}
            >
              完成
            </button>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state, ownProps) {
  const pack = state.pack.find(i => ownProps.params.id === i.id);
  return {
    userId: state.user.id,
    userName: state.user.name,
    content: pack.version[0].content,
    packId: pack.id,
  };
}

NewPack.propTypes = {
  dispatch: React.PropTypes.func.isRequired,
  content: React.PropTypes.string.isRequired,
  userId: React.PropTypes.string.isRequired,
  userName: React.PropTypes.string.isRequired,
  packId: React.PropTypes.string.isRequired,
};

export default connect(
  mapStateToProps
)(mdlUpgrade(NewPack));
