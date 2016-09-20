import React, { Component } from 'react';
import DrawerContainer from './page/containers/DrawerContainer';
import ModalRoot from './page/containers/ModalRoot';
import HeaderContainer from './page/containers/HeaderContainer';
import { USER_NOT_LOGIN, checkLogin, fbLoaded } from './actions';

class App extends Component {
  constructor(props) {
    super(props);
    // init(()=>{this.props.dispatch(fbLoaded())});
  }

  componentWillUpdate(nextProps, nextState) {
    if (nextProps.initState === USER_NOT_LOGIN) {
      this.context.router.push('/start');
    }
  }

  render() {
    return (
      <div className="mdl-layout mdl-js-layout mdl-layout--fixed-drawer
        mdl-layout--fixed-header">
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

export default App;
