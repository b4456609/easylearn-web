import { connect } from 'react-redux';
import React from 'react';
import './NewPack.css';
import { newPack } from '../actions';
import img from '../img/305.png';
import mdlUpgrade from '../utils/mdlUpgrade.js';
import Editor from './components/components/Editor.js';
import EditorApi from '../api/editor.js';

class NewPack extends React.Component {

  constructor(props, context) {
    super(props, context);
    this.state = {
      file: null,
    };
    this.onFinish = this.onFinish.bind(this);
  }

  componentDidMount() {
    // eslint-disable-next-line
    document.getElementById('file').onchange = (event) => {
      const input = event.target;
      if (input.files && input.files[0]) {
        const reader = new FileReader();
        reader.onload = (e) => {
          document.getElementById('cover-img').src = e.target.result;
        };
        reader.readAsDataURL(input.files[0]);
        this.setState({ file: input.files[0] });
      }
    };
  }

  onFinish() {
    const content = EditorApi.getContent();
    const title = document.getElementById('title').value;
    const description = document.getElementById('description').value;
    const isPublic = document.querySelector('#public-checkbox').checked;
    const { file } = this.state;
    const { userId, userName } = this.props;
    const id = `pack${new Date().getTime()}`;
    this.props.dispatch(newPack(id, title, description, isPublic, content, userId, userName, file));
  }

  render() {
    const top = (
      <div className="mdl-grid">
        <div className="mdl-cell mdl-cell--4-col mdl-cell--6-col-desktop">
          <div className="mdl-textfield mdl-js-textfield mdl-textfield--floating-label text-field">
            <input className="mdl-textfield__input" type="text" id="title" />
            <label className="mdl-textfield__label" htmlFor="title">名稱</label>
          </div>
        </div>
        <div className="mdl-cell mdl-cell--4-col mdl-cell--6-col-desktop">
          <div className="mdl-textfield mdl-js-textfield mdl-textfield--floating-label text-field">
            <input className="mdl-textfield__input" type="text" id="description" />
            <label className="mdl-textfield__label" htmlFor="description">描述</label>
          </div>
        </div>
        <div className="mdl-cell mdl-cell--4-col mdl-cell--6-col-desktop public-div">
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
        <div className="mdl-cell mdl-cell--4-col mdl-cell--6-col-desktop">
          <input type="file" id="file" />
          <label
            htmlFor="file"
            className="mdl-button mdl-js-button mdl-button--raised mdl-button--colored"
          >
            更換封面照片
          </label>
        </div>
        <div className="mdl-cell mdl-cell--12-col mdl-typography--text-center">
          <img id="cover-img" alt="pack's cover img" src={img} />
        </div>
      </div>
    );

    const middle = (
      <div className="mdl-grid mdl-grid--no-spacing">
        <div
          className="mdl-cell mdl-cell--12-col mdl-cell--10-col-desktop mdl-cell--1-offset-desktop"
        >
          <Editor />
        </div>
      </div>
    );

    const bottom = (
      <div className="mdl-grid">
        <div className="mdl-cell mdl-cell--4-col">
          <button
            className="mdl-button mdl-js-button
            mdl-button--raised mdl-js-ripple-effect mdl-button--accent" onClick={this.onFinish}
          >
            完成
          </button>
        </div>
      </div>
    );

    return (
      <div>
        <div className="mdl-grid mdl-grid--no-spacing">
          <div
            className="mdl-cell mdl-cell--12-col
            mdl-cell--10-col-desktop mdl-cell--1-offset-desktop"
          >
            {top}
          </div>
        </div>
        {middle}
        <div className="mdl-grid mdl-grid--no-spacing">
          <div
            className="mdl-cell mdl-cell--12-col
            mdl-cell--10-col-desktop mdl-cell--1-offset-desktop"
          >
            {bottom}
          </div>
        </div>
      </div>
    );
  }
}

NewPack.propTypes = {
  userId: React.PropTypes.string.isRequired,
  userName: React.PropTypes.string.isRequired,
  dispatch: React.PropTypes.func.isRequired,
};

const mapStateToProps = state => (
  {
    userId: state.user.id,
    userName: state.user.name,
  }
);

export default connect(
  mapStateToProps
)(mdlUpgrade(NewPack));
