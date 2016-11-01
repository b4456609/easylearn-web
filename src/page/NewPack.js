import { connect } from 'react-redux';
import TinyMCE from 'react-tinymce';
import React from 'react';
import './NewPack.css';
import { newPack } from '../actions';
import img from '../img/305.png';
import mdlUpgrade from '../utils/mdlUpgrade.js';
import Editor from '../api/editor.js';

class NewPack extends React.Component {

  constructor(props, context) {
    super(props, context);
    this.state = {
      isPublic: true,
      file: null,
    };
    this.onFinish = this.onFinish.bind(this);
  }

  componentWillMount() {
    document.addEventListener('mdl-componentupgraded', function(e) {
      Editor.init();
    });
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
        this.state.file = input.files[0];
      }
    };
  }

  componentWillUnmount() {
    tinymce.remove();
  }

  onFinish() {
    const content = Editor.getContent();
    const title = document.getElementById('title').value;
    const description = document.getElementById('description').value;
    const { isPublic, file } = this.state;
    const { userId, userName } = this.props;
    const id = 'pack' + new Date().getTime();
    this.props.dispatch(newPack(id, title, description, isPublic, content, userId, userName, file));
  }

  getYoutubeDialog() {
    return (
      <dialog className="mdl-dialog">
        <h4 className="mdl-dialog__title">
          插入Youtube
        </h4>
        <div className="mdl-dialog__content">
          <div className="mdl-textfield mdl-js-textfield">
            <input className="mdl-textfield__input" type="text" id="sample1" />
              <label className="mdl-textfield__label" htmlFor="sample1">Text...</label>
            </div>
        </div>
        <div className="mdl-dialog__actions">
          {this.actionList()}
        </div>
      </dialog>
    );
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
        <div className="mdl-cell mdl-cell--4-col mdl-cell--6-col-desktop">
          <input type="file" id="file" />
          <label htmlFor="file" className="mdl-button mdl-js-button mdl-button--raised mdl-button--colored">
            選擇封面照片
          </label>
        </div>
        <div className="mdl-cell mdl-cell--4-col mdl-cell--6-col-desktop">
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
            <span className="mdl-checkbox__label">公開此懶人包</span>
          </label>
        </div>
        <div className="mdl-cell mdl-cell--12-col">
          <img id="cover-img" alt="pack's cover img" src={img} />
        </div>
      </div>
    );

    const middle = (
        <div className="mdl-grid mdl-grid--no-spacing">
          <div className="mdl-cell mdl-cell--12-col mdl-cell--10-col-desktop mdl-cell--1-offset-desktop">
            <div id="editor" className="pack-content" />
          </div>
        </div>
    );

    const bottom = (
      <div className="mdl-grid">
        <div className="mdl-cell mdl-cell--4-col">
          <button className="mdl-button mdl-js-button
            mdl-button--raised mdl-js-ripple-effect mdl-button--accent" onClick={this.onFinish}>
            完成
          </button>
        </div>
      </div>
    );

    return (
      <div>
        <div className="mdl-grid mdl-grid--no-spacing">
          <div className="mdl-cell mdl-cell--12-col mdl-cell--10-col-desktop mdl-cell--1-offset-desktop">
            {top}
          </div>
        </div>
        {middle}
        <div className="mdl-grid mdl-grid--no-spacing">
          <div className="mdl-cell mdl-cell--12-col mdl-cell--10-col-desktop mdl-cell--1-offset-desktop">
            {bottom}
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
