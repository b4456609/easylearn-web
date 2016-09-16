import { connect } from 'react-redux';
import React from 'react';
import Paper from 'material-ui/Paper';
import './Pack.css';


class Pack extends React.Component {

  constructor(props, context) {
    super(props, context);
  }

  render() {
    return (
      <Paper zDepth={1}>
        <div className="paper row center-xs">
          <div className="col-xs-12 col-sm-11">
          <div
            className="box"
            style={{ textAlign: 'left' }}
          >
            <h1>
              {this.props.pack.name}
            </h1>
          </div>
            <div
              className="box"
              style={{ textAlign: 'left' }}
              dangerouslySetInnerHTML={{ __html: this.props.version.content }}
            />
          </div>
        </div>
      </Paper>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const packId = ownProps.params.id;
  const pack = state.pack.find(item => item.id === packId);
  const version = pack.version[0];
  console.log(packId, pack);
  return {
    pack,
    version,
  };
};

export default connect(
  mapStateToProps
)(Pack);
