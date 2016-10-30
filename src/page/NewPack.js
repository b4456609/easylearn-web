import { connect } from 'react-redux';
import TinyMCE from 'react-tinymce';
import React from 'react';
import './NewPack.css';
import { newPack } from '../actions';
import img from '../img/305.png';
import mdlUpgrade from '../utils/mdlUpgrade.js';

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
      tinymce.init({
        selector: "#editable",
      });
    });
  }

  componentDidMount() {
    // eslint-disable-next-line
    // new MediumEditor('#editable');
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
    const content = document.getElementById('editable').innerHTML;
    const title = document.getElementById('title').value;
    const description = document.getElementById('description').value;
    const { isPublic, file } = this.state;
    const { userId, userName } = this.props;
    const id = 'pack' + new Date().getTime();
    this.props.dispatch(newPack(id, title, description, isPublic, content, userId, userName, file));
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
                <label className="mdl-textfield__label" htmlFor="title">名稱</label>
              </div>
            </div>
            <div className="mdl-cell--4-col mdl-cell--6-col-desktop text-field">
              <div className="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
                <input className="mdl-textfield__input" type="text" id="description" />
                <label className="mdl-textfield__label" htmlFor="description">描述</label>
              </div>
            </div>
            <div className="mdl-cell--4-col mdl-cell--6-col-desktop">
              <input type="file" id="file" />
              <label htmlFor="file" className="mdl-button mdl-js-button mdl-button--raised mdl-button--colored">
                選擇封面照片
              </label>
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
                <span className="mdl-checkbox__label">公開</span>
              </label>
            </div>
            <div className="mdl-cell--12-col">
              <img id="cover-img" alt="pack's cover img" src={img} />
            </div>
            <div className="mdl-cell--12-col">
              <div id="editable" className="pack-content" />
            </div>
            <div className="mdl-cell--12-col">
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
