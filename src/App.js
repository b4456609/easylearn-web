import React, { Component } from 'react';
import DrawerContainer from './page/containers/DrawerContainer';
import ModalRoot from './page/containers/ModalRoot';
import HeaderContainer from './page/containers/HeaderContainer';
import { USER_NOT_LOGIN, checkLogin, fbLoaded } from './actions';
import { init } from './api/fb.js';
import { connect } from 'react-redux';
import GetStart from './page/GetStart';
import mdlUpgrade from './utils/mdlUpgrade';

class App extends Component {
  constructor(props) {
    super(props);
    init(() => { this.props.dispatch(fbLoaded()); });
  }

  componentDidUpdate(){
    window.componentHandler.upgradeDom();
  }

  render() {
    if (this.props.initState === 'init') {
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
