import React from 'react';
import AppBar from 'material-ui/AppBar';
import { spacing } from 'material-ui/styles';
import { connect } from 'react-redux';
import CircularProgress from 'material-ui/CircularProgress';

import DrawerContainer from './containers/DrawerContainer';

import ModalRoot from './containers/ModalRoot';

import { USER_NOT_LOGIN, checkLogin } from '../actions';

const style = {
  paddingLeft: 256,
  margin: spacing.desktopGutter,
};

class Home extends React.Component {
  constructor(props, context) {
    super(props, context);
  }

  componentWillUpdate(nextProps, nextState) {
    if (nextProps.initState === USER_NOT_LOGIN) {
      this.context.router.push('/start');
    }
  }

  render() {
    if (this.props.initState === 'init') {
      return (
        <div>
          <AppBar title="Easylearn" />
          <div style={{ textAlign: 'center', margin: '50px' }}>
            <CircularProgress size={2} />
          </div>
        </div>);
    } else {
      return (
      <div>
        <AppBar title="Easylearn" />
        <DrawerContainer />
        <div style={style}>
        {this.props.children}
        </div>
        <ModalRoot />
      </div>);
    }
  }
}

Home.propTypes = {
  children: React.PropTypes.element,
  initState: React.PropTypes.string,
  dispatch: React.PropTypes.func,
};

Home.contextTypes = {
  router: React.PropTypes.object.isRequired,
};

export default connect(
  state => ({
    initState: state.app.initState,
  })
)(Home);
