import { connect } from 'react-redux';
import React from 'react';
import './Pack.css';
import mdlUpgrade from '../utils/mdlUpgrade.js';
import { newNote } from '../actions/';

function getWindowSize() {
  const w = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
  const h = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);

  return {
    x: w - 150,
    y: h - 150,
  };
}

function getSelectionCoords() {
  const win = window;
  const doc = win.document;
  let sel = doc.selection;
  let range;
  let rects;
  let rect;
  let x = 0;
  let y = 0;

  if (sel) {
    if (sel.type !== 'Control') {
      range = sel.createRange();
      range.collapse(true);
      x = range.boundingLeft;
      y = range.boundingTop;
    }
  } else if (win.getSelection) {
    sel = win.getSelection();

    const textNode = sel.focusNode;
    const content = document.getElementById('content');
    if (!content.contains(textNode)) {
      return getWindowSize();
    }

    if (sel.isCollapsed === true) {
      return getWindowSize();
    } else if (sel.rangeCount) {
      range = sel.getRangeAt(0).cloneRange();
      if (range.getClientRects) {
        rects = range.getClientRects();
        if (rects.length > 0) {
          rect = range.getClientRects()[0];
        }
        x = rect.right;
        y = rect.top + window.pageYOffset;
      } else {
        return getWindowSize();
      }
    }
  } else {
    return getWindowSize();
  }
  return {
    x,
    y,
  };
}

function paintNote(range, noteId, classColor, content) {
  const span = document.createElement('span');
  span.className = 'note ' + classColor;
  span.setAttribute('id', noteId);
  range.surroundContents(span);
  const div = document.createElement('div');
  div.className = 'mdl-tooltip mdl-tooltip--large';
  div.setAttribute('for', noteId);
  div.innerHTML = content;
  range.insertNode(div);
  window.componentHandler.upgradeElement(div);
}

class Pack extends React.Component {
  constructor(props) {
    super(props);
    const cord = getWindowSize();
    this.state = {
      noteText: '',
      note: {},
      x: cord.x,
      y: cord.y,
      range: null,
      selectionText: null,
    };
    this.buttonStyle = this.buttonStyle.bind(this);
    this.onFloatBtnClick = this.onFloatBtnClick.bind(this);
    this.onCloseClick = this.onCloseClick.bind(this);
    this.onSubmitClick = this.onSubmitClick.bind(this);
  }

  componentDidMount() {
    document.onmouseup = () => {
      const coords = getSelectionCoords();
      this.setState({
        x: coords.x,
        y: coords.y,
      });
    };
  }

  componentWillUnmount() {
    document.onmouseup = null;
  }

  onFloatBtnClick() {
    const selection = window.getSelection();
    const textNode = selection.focusNode;
    const content = document.getElementById('content');
    const text = selection.toString();

    // select words and is in version content
    if (text !== '' && content.contains(textNode)) {
      this.setState({
        range: selection.getRangeAt(0).cloneRange(),
        selectionText: selection.toString().trim(),
      });
      this.dialog = document.querySelector('dialog');
      this.dialog.showModal();
    } else {
      const snackbarContainer = document.querySelector('#demo-toast-example');
      snackbarContainer.MaterialSnackbar.showSnackbar({ message: '請選擇文章的文字' });
    }
  }

  onCloseClick() {
    this.dialog.close();
  }

  onSubmitClick() {
    const { pack, version, userId, userName, dispatch } = this.props;
    const noteId = `note${new Date().getTime()}`;
    const content = document.getElementById('note-content').value;
    const newContent = document.getElementById('content').innerHTML;
    paintNote(this.state.range, noteId, 'mdl-color--indigo-100', content);
    dispatch(newNote(pack.id, version.id, noteId, userId, userName, content, newContent));
    this.dialog.close();
  }

  buttonStyle() {
    return {
      position: 'fixed',
      left: this.state.x + 20,
      top: this.state.y + 20,
    };
  }

  render() {
    return (
      <div>
        <div className="demo-container mdl-grid">
          <div className="mdl-cell mdl-cell--2-col mdl-cell--hide-tablet mdl-cell--hide-phone" />
          <div
            className="demo-content
            mdl-color--white mdl-shadow--4dp content
            mdl-color-text--grey-800 mdl-cell mdl-cell--8-col"
          >
            <h3>
              {this.props.pack.name}
            </h3>
            <div
              id="content"
              className="pack-content"
              dangerouslySetInnerHTML={{ __html: this.props.version.content }}
            />
          </div>
        </div>
        <div className="floatbtn" style={this.buttonStyle()}>
          <button
            className="mdl-button mdl-js-button mdl-button--fab mdl-button--colored"
            onClick={this.onFloatBtnClick}
          >
            <i className="material-icons">add</i>
          </button>
        </div>
        <dialog className="mdl-dialog">
          <h4 className="mdl-dialog__title">
            {this.state.selectionText}
          </h4>
          <div className="mdl-dialog__content">
            <div className="mdl-textfield mdl-js-textfield">
              <input
                className="mdl-textfield__input"
                type="text"
                id="note-content"
              />
              <label
                className="mdl-textfield__label"
                htmlFor="note-content"
              >便利貼內容</label>
            </div>
          </div>
          <div className="mdl-dialog__actions">
            <button
              type="button"
              className="mdl-button"
              onClick={this.onSubmitClick}
            >確定</button>
            <button
              type="button"
              className="mdl-button close"
              onClick={this.onCloseClick}
            >取消</button>
          </div>
        </dialog>
        <div id="demo-toast-example" className="mdl-js-snackbar mdl-snackbar">
          <div className="mdl-snackbar__text" />
          <button className="mdl-snackbar__action" type="button" />
        </div>
      </div>
    );
  }
}

Pack.propTypes = {
  pack: React.PropTypes.shape({
    name: React.PropTypes.string,
  }),
  version: React.PropTypes.shape({
    content: React.PropTypes.string,
  }),
  userId: React.PropTypes.string,
  userName: React.PropTypes.string,
  dispatch: React.PropTypes.func,
};

const mapStateToProps = (state, ownProps) => {
  const packId = ownProps.params.id;
  const pack = state.pack.find(item => item.id === packId);
  let version = null;
  pack.version.sort((a, b) => b.createTime - a.createTime);
  if (!ownProps.params.versionId) {
    // browserHistory.push(`/pack/${packId}/${pack.version[0].id}`);
    version = pack.version[0];
  } else {
    version = pack.version.find(i => i.id === ownProps.params.versionId);
  }
  return {
    pack,
    version,
    userId: state.user.id,
    userName: state.user.name,
  };
};

export default connect(
  mapStateToProps
)(mdlUpgrade(Pack));
