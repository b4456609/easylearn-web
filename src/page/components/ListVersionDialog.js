import React from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import { hideDialog, movePackToFolder } from '../../actions';
import mdlUpgrade from '../../utils/mdlUpgrade';
import { browserHistory } from 'react-router';
import './ListVersionDialog.css';

class ListVersionDialog extends React.Component {
  constructor(props) {
    super(props);
    this.onCloseClick = this.onCloseClick.bind(this);
  }

  componentDidMount() {
    this.dialog = document.querySelector('dialog');
    this.dialog.showModal();
  }

  onCloseClick() {
    this.dialog.close();
    this.props.dispatch(hideDialog());
  }

  render() {
    return (
      <dialog className="mdl-dialog">
        <h4 className="mdl-dialog__title">
          觀看版本
        </h4>
        <div className="mdl-dialog__content">
          <ul className="demo-list-control mdl-list">
            {this.props.version.map(i=>(
              <li key={i.createTime} className="mdl-list__item">
                <span className="mdl-list__item-primary-content">
                  <i className="material-icons  mdl-list__item-avatar">person</i>
                  {moment(i.createTime).fromNow()}
                </span>
                <span className="mdl-list__item-secondary-action">
                  <label className="demo-list-radio mdl-radio mdl-js-radio mdl-js-ripple-effect" htmlFor={`list-option-${i.createTime}`}>
                    <input
                      type="radio"
                      id={`list-option-${i.createTime}`}
                      className="mdl-radio__button"
                      name="options"
                      value="1"
                      onClick={()=>{
                        browserHistory.push(`/pack/${this.props.packId}/${i.id}`);
                        this.onCloseClick();
                      }}
                      defaultChecked />
                  </label>
                </span>
              </li>
            ))}
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

export default connect(
  (state, ownProps) => {
    return {
      packId: ownProps.params.id,
      version: state.pack.find(i => i.id === ownProps.params.id)
      .version.map(i => (
        {
          createTime: i.createTime,
          id: i.id,
        })),
    }
  }
)(mdlUpgrade(ListVersionDialog));
