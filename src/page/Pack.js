import { connect } from 'react-redux';
import React from 'react';
import './Pack.css';
import { browserHistory } from 'react-router';
import mdlUpgrade from '../utils/mdlUpgrade.js';

function getWindowSize() {
  const w = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
  const h = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);

  return {
    x: w - 150,
    y: h - 150,
  };
}

function getSelectionCoords(win) {
  win = win || window;
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


class Pack extends React.Component {
  constructor(props) {
    super(props);
    const cord = getWindowSize();
    this.state = {
      x: cord.x,
      y: cord.y,
    };
    this.buttonStyle = this.buttonStyle.bind(this);
  }

  componentDidMount() {
    document.onmouseup = () => {
      const coords = getSelectionCoords();
      console.log('document.onmouseup', coords.x, coords.y);
      this.setState({
        x: coords.x,
        y: coords.y,
      });
    };
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
          <button className="mdl-button mdl-js-button mdl-button--fab mdl-button--colored">
            <i className="material-icons">add</i>
          </button>
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
  console.log(version);
  return {
    pack,
    version,
  };
};

export default connect(
  mapStateToProps
)(mdlUpgrade(Pack));
