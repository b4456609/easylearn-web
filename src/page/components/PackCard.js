import { connect } from 'react-redux';
import React, { PropTypes } from 'react';
import { showDialog, movePackOut } from '../../actions/';
import './PackCard.css';
import img from '../../img/305.png';
import mdlUpgrade from '../../utils/mdlUpgrade.js';

class PackCard extends React.Component {
  constructor(props) {
    super(props);
    this.goto = this.goto.bind(this);
    this.getImg = this.getImg.bind(this);
    this.getToolTip = this.getToolTip.bind(this);
    this.getDescription = this.getDescription.bind(this);
  }

  goto() {
    this.context.router.push(`/pack/${this.props.id}`);
  }

  getImg() {
    if (this.props.imgUrl === '') {
      return img;
    }
    else {
      return `//i.imgur.com/${this.props.imgUrl}`;
    }
  }

  getToolTip() {
    if (!this.props.isPublic) {
      return (
        <i id={`pack-tooltip-${this.props.id}`} className="material-icons mdl-color-text--grey-600">person</i>
      );
    }
    return null;
  }

  getDescription() {
    if (this.props.description === '') {
      return null;
    }
    return (
      <div className="mdl-card__supporting-text">
        {this.props.description}
      </div>
    );
  }

  render() {
    let menu = (
      <li
        className="mdl-menu__item"
        onClick={() => {
          this.props.dispatch(showDialog('MOVE_PACK', { id: this.props.id }));
        }}
      >
        放到資料夾
      </li>);
    if (this.props.folderId !== 'all') {
      menu = (
        <li
          className="mdl-menu__item"
          onClick={() => {
            this.props.dispatch(movePackOut(this.props.id, this.props.folderId));
          }}
        >
          移出資料夾
        </li>
      );
    }
    return (
      <div className="mdl-cell mdl-cell--4-col">
        <div className="demo-card-wide mdl-card mdl-shadow--2dp">
          <div className="mdl-card__title">
            <h2 className="mdl-card__title-text">{this.props.name}</h2>
          </div>
          <div className="mdl-card__media">
            <img
              className="card-img"
              src={this.getImg()}
              alt={this.props.name}
            />
          </div>
          {this.getDescription()}
          <div className="mdl-card__actions mdl-card--border">
            <button
              className="mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect"
              onClick={this.goto}
            >
              閱讀
            </button>
            <div className="mdl-layout-spacer" />
            {this.getToolTip()}
          </div>
          <div className="mdl-card__menu">
            <button
              id={`pack-menu-${this.props.id}`}
              className="mdl-button mdl-button--icon mdl-js-button mdl-js-ripple-effect"
            >
              <i className="material-icons mdl-color-text--grey-700">more_vert</i>
            </button>
            <ul
              className="mdl-menu mdl-menu--bottom-right mdl-js-menu mdl-js-ripple-effect"
              htmlFor={`pack-menu-${this.props.id}`}
            >
              <li
                className="mdl-menu__item"
                onClick={() => {
                  this.props.dispatch(showDialog('REMOVE_PACK_DIALOG', { id: this.props.id, name: this.props.name }));
                }}
              >
                刪除
              </li>
              {menu}
            </ul>
          </div>
        </div>
        <span className="mdl-tooltip" data-mdl-for={`pack-tooltip-${this.props.id}`}>
          私有的懶人包
        </span>
      </div>
    );
  }
}

PackCard.contextTypes = {
  router: React.PropTypes.object.isRequired,
};

PackCard.propTypes = {
  name: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  imgUrl: PropTypes.string.isRequired,
  folderId: PropTypes.string.isRequired,
  dispatch: PropTypes.func.isRequired,
  isPublic: PropTypes.bool,
};

export default connect(
)(mdlUpgrade(PackCard));
