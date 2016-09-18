import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
// import TinyMCE from 'react-tinymce';
import React from 'react';
import './NewPack.css';
import { newPack } from '../actions';
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

  onFinish() {
    const content = document.getElementById('editable').innerHTML;
    const title = document.getElementById('title').value;
    const description = document.getElementById('description').value;
    const { isPublic } = this.state;
    const { userId, userName } = this.props;
    const id = 'pack' + new Date().getTime();
    this.props.dispatch(newPack(id, title, description, isPublic, content, userId, userName));
    // Go to /some/path.
    browserHistory.push('/');
  }

  componentDidMount() {
    var editor = new MediumEditor('#editable');
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
            <div className="mdl-cell--4-col mdl-cell--6-col-desktop text-field">
              <div className="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
                <input className="mdl-textfield__input" type="text" id="title" />
                <label className="mdl-textfield__label" htmlFor="title">Title</label>
              </div>
            </div>
            <div className="mdl-cell--4-col mdl-cell--6-col-desktop text-field">
              <div className="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
                <input className="mdl-textfield__input" type="text" id="description" />
                <label className="mdl-textfield__label" htmlFor="description">Description</label>
              </div>
            </div>
            <div className="mdl-cell--4-col mdl-cell--6-col-desktop">
              <label
                className="mdl-checkbox mdl-js-checkbox mdl-js-ripple-effect"
                htmlFor="public-checkbox"
              >
                <input
                  type="checkbox"
                  id="public-checkbox"
                  className="mdl-checkbox__input"
                  defaultChecked
                />
                <span className="mdl-checkbox__label">Public</span>
              </label>
            </div>
            <div className="mdl-cell--4-col mdl-cell--6-col-desktop">
              <button className="mdl-button mdl-js-button mdl-button--raised mdl-button--colored">
                Choose Cover Image
              </button>
            </div>
            <div className="mdl-cell--12-col">
              <div id="editable" className="pack-content"></div>
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

const mapStateToProps = state => (
  {
    userId: state.user.id,
    userName: state.user.name,
  }
);

export default connect(
  mapStateToProps
)(mdlUpgrade(NewPack));
