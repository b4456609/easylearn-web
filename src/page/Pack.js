import { connect } from 'react-redux';
import React from 'react';
import './Pack.css';

class Pack extends React.Component {
  render() {
    return (
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
          <div className="pack-content" dangerouslySetInnerHTML={{ __html: this.props.version.content }} />
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
  const version = pack.version[0];
  return {
    pack,
    version,
  };
};

export default connect(
  mapStateToProps
)(Pack);
