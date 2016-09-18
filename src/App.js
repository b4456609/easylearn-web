import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { init } from './api/fb';
import { fbLoaded } from './actions';
import { connect } from 'react-redux';

class App extends Component {
  constructor(props) {
    super(props)
    init(()=>{this.props.dispatch(fbLoaded())});
  }

  render() {
    return (
      <MuiThemeProvider>
        {this.props.children}
      </MuiThemeProvider>
      );
  }
}

export default connect()(App);
