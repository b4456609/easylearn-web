import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
// import TinyMCE from 'react-tinymce';
import React from 'react';
import './NewPack.css';
import { newVersion } from '../actions';
// import Editor from './components/Editor';
import mdlUpgrade from '../utils/mdlUpgrade.js';


class NewPack extends React.Component {

  constructor(props, context) {
    super(props, context);
    this.state = {
      isPublic: true,
    };
    this.onFinish = this.onFinish.bind(this);
  }

  componentDidMount() {
    new MediumEditor('#editable');
  }

  onFinish() {
    const content = document.getElementById('editable').innerHTML;
    const { userId, userName, packId } = this.props;
    const versionId = `version${new Date().getTime()}`;
    this.props.dispatch(newVersion(packId, versionId, content, userId, userName));
    browserHistory.push(`/pack/${packId}/${versionId}`);
  }

  render() {
    return (
      <div className="demo-container mdl-grid">
        <div className="mdl-cell mdl-cell--1-col mdl-cell--hide-tablet mdl-cell--hide-phone" />
        <div
          className="demo-content
          mdl-color--white mdl-shadow--4dp content
          mdl-color-text--grey-800 mdl-cell mdl-cell--10-col"
        >
          <div className="mdl-grid">
            <div className="mdl-cell--12-col">
              <div
                id="editable"
                className="pack-content"
                dangerouslySetInnerHTML={{ __html: this.props.content }}
              />
            </div>
            <div className="mdl-cell--12-col">
              <button
                className="mdl-button mdl-js-button
                mdl-button--raised mdl-js-ripple-effect mdl-button--accent"
                onClick={this.onFinish}
              >
                Finish
              </button>
            </div>
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

export default connect(
  mapStateToProps
)(mdlUpgrade(NewPack));
