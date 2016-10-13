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
  }

  goto() {
    this.context.router.push(`/pack/${this.props.id}`);
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
    if (this.props.folderId !== 'all')
      menu = (
        <li
          className="mdl-menu__item"
          onClick={() => {
            this.props.dispatch(movePackOut(this.props.id, this.props.folderId));
          }}
        >
          移出資料夾
        </li>);
    return (
      <div className="mdl-cell mdl-cell--4-col">
        <div className="demo-card-wide mdl-card mdl-shadow--2dp">
          <div className="mdl-card__title">
            <h2 className="mdl-card__title-text">{this.props.name}</h2>
          </div>
          <div className="mdl-card__media">
            <img
              className="card-img"
              src={img}
              alt="{this.props.name}"
            />
          </div>
          <div className="mdl-card__supporting-text">
            {this.props.description}
          </div>
          <div className="mdl-card__actions mdl-card--border">
            <a
              className="mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect"
              onClick={this.goto}
            >
              閱讀
            </a>
          </div>
          <div className="mdl-card__menu">
            <button
              id={`pack-menu-${this.props.id}`}
              className="mdl-button mdl-button--icon mdl-js-button mdl-js-ripple-effect"
            >
              <i className="material-icons">more_vert</i>
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
  folderId: PropTypes.string.isRequired,
  dispatch: PropTypes.func.isRequired,
};

export default connect(
)(mdlUpgrade(PackCard));
