import React, { Component } from 'react';
import { init } from './api/fb';
import { fbLoaded } from './actions';
import { connect } from 'react-redux';
import PackCard from './page/components/PackCard';
import DrawerContainer from './page/containers/DrawerContainer';
import Header from './page/components/Header';

class App extends Component {
  constructor(props) {
    super(props);
    // init(()=>{this.props.dispatch(fbLoaded())});
  }

  render() {
    return (
      <div className="mdl-layout mdl-js-layout mdl-layout--fixed-drawer
        mdl-layout--fixed-header">
        <Header />
        <DrawerContainer />
        <main className="mdl-layout__content">
          <div className="page-content">
            {this.props.children}
          </div>
        </main>
      </div>
      );
  }
}

export default connect()(App);
