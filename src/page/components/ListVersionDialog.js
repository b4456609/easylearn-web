import React from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import moment from 'moment';
import { hideDialog } from '../../actions';
import mdlUpgrade from '../../utils/mdlUpgrade';
import './ListVersionDialog.css';

class ListVersionDialog extends React.Component {
  constructor(props) {
    super(props);
    this.onCloseClick = this.onCloseClick.bind(this);
  }

  componentDidMount() {
    this.dialog = document.querySelector('#pack-viewversion');
    this.dialog.showModal();
  }

  onCloseClick() {
    this.dialog.close();
    this.props.dispatch(hideDialog());
  }

  render() {
    return (
      <dialog className="mdl-dialog" id="pack-viewversion">
        <h4 className="mdl-dialog__title">
          觀看版本
        </h4>
        <div className="mdl-dialog__content">
          <ul className="demo-list-control mdl-list">
            {this.props.version.map((i) => {
              let check = (
                <input
                  type="radio"
                  id={`list-option-${i.createTime}`}
                  className="mdl-radio__button"
                  name="options"
                  onClick={() => {
                    browserHistory.push(`/pack/${this.props.packId}/${i.id}`);
                    this.onCloseClick();
                  }}
                />
              );

              if (i.id === this.props.versionId) {
                check = (<input
                  type="radio"
                  id={`list-option-${i.createTime}`}
                  className="mdl-radio__button"
                  name="options"
                  onClick={() => {
                    browserHistory.push(`/pack/${this.props.packId}/${i.id}`);
                    this.onCloseClick();
                  }}
                  defaultChecked
                />);
              }
              return (
                <li key={i.createTime} className="mdl-list__item">
                  <span className="mdl-list__item-primary-content">
                    <img className="mdl-list__item-avatar" src={`//graph.facebook.com/${i.creatorUserId}/picture`} alt={name} />
                    {moment(i.createTime).fromNow()}
                  </span>
                  <span className="mdl-list__item-secondary-action">
                    <label className="demo-list-radio mdl-radio mdl-js-radio mdl-js-ripple-effect" htmlFor={`list-option-${i.createTime}`}>
                      {check}
                    </label>
                  </span>
                </li>);
            })}
          </ul>
        </div>
        <div className="mdl-dialog__actions">
          <button
            type="button"
            className="mdl-button close"
            onClick={this.onCloseClick}
          >關閉</button>
        </div>
      </dialog>
    );
  }
}

ListVersionDialog.propTypes = {
  version: React.PropTypes.arrayOf(React.PropTypes.shape({
    createTime: React.PropTypes.number.isRequired,
    id: React.PropTypes.string.isRequired,
  })).isRequired,
  versionId: React.PropTypes.string.isRequired,
  packId: React.PropTypes.string.isRequired,
  dispatch: React.PropTypes.func.isRequired,
};

export default connect(
  (state, ownProps) => ({
    versionId: state.dialog.modalProps.versionId,
    packId: ownProps.params.id,
    version: state.pack
      .find(i => i.id === ownProps.params.id)
      .version
      .sort((a, b) => b.createTime - a.createTime),
  })
)(mdlUpgrade(ListVersionDialog));
