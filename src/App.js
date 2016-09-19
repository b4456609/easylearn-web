import React, { Component } from 'react';
import { connect } from 'react-redux';
import DrawerContainer from './page/containers/DrawerContainer';
import Header from './page/components/Header';
import ModalRoot from './page/containers/ModalRoot';
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
        <Header title={this.props.title} />
        <DrawerContainer />
        <main className="mdl-layout__content">
          <div className="page-content">
            {this.props.children}
          </div>
        </main>
        <ModalRoot />
      </div>
      );
  }
}

export default connect(
  (state, ownProps) => {
    console.log(state, ownProps);
    let title = '';
    if (ownProps.location.pathname === '/new-pack') {
      title = '新增懶人包';
    } else if (ownProps.location.pathname.indexOf('/pack') !== -1) {
      title = ownProps.params.id && state.pack.find(i => i.id === ownProps.params.id).name;
    } else {
      title = ownProps.params.id && state.folder.find(i => i.id === ownProps.params.id).name;
    }
    return {
      initState: state.app.initState,
      title,
    };
  }
)(App);
