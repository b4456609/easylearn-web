import React, { Component } from 'react';
import { connect } from 'react-redux';
import DrawerContainer from './page/containers/DrawerContainer';
import ModalRoot from './page/containers/ModalRoot';
import HeaderContainer from './page/containers/HeaderContainer';
import { fbLoaded, loadData } from './actions';
import { init } from './api/fb.js';
import GetStart from './page/GetStart';
import mdlUpgrade from './utils/mdlUpgrade';
import { appLogin } from './api/easylearn';

class App extends Component {
  constructor(props) {
    super(props);
    if (process.env.NODE_ENV === 'production') {
      init(() => { this.props.dispatch(fbLoaded()); });
    }
    else {
      appLogin('id', 'name');
      this.props.dispatch(loadData());
    }
  }

  componentDidUpdate() {
    window.componentHandler.upgradeDom();
  }

  render() {
    if (this.props.initState === 'init' || this.props.initState === 'USER_FB_LOGIN_SUCCESS') {
      return (
        <div style={{ textAlign: 'center', margin: '50px' }}>
          <div className="mdl-spinner mdl-js-spinner is-active" />
        </div>
      );
    } else if (this.props.initState === 'USER_NOT_LOGIN') {
      return (<GetStart />);
    }

    return (
      <div
        className="mdl-layout mdl-js-layout mdl-layout--fixed-drawer
        mdl-layout--fixed-header"
      >
        <HeaderContainer {...this.props} />
        <DrawerContainer />
        <main className="mdl-layout__content">
          <div className="page-content">
            {this.props.children}
          </div>
        </main>
        <ModalRoot {...this.props} />
      </div>
      );
  }
}

App.propTypes = {
  children: React.PropTypes.element,
  initState: React.PropTypes.string,
  dispatch: React.PropTypes.func,
};


App.contextTypes = {
  router: React.PropTypes.object.isRequired,
};

export default connect(
  state => ({
    initState: state.app.initState,
  })
)(mdlUpgrade(App));
