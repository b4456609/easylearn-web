import React, {Component} from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import {spacing} from 'material-ui/styles';

import PackCard from './components/PackCard'
import DrawerContainer from './containers/DrawerContainer'

import ModalRoot from './containers/ModalRoot'

class App extends Component {
    getStyles() {
      return {
        root:{
          paddingLeft : 256,
          margin: spacing.desktopGutter,
        }
      }
    }

    render() {
      return (
        <MuiThemeProvider>
          <div>
            <AppBar title="Title" iconClassNameRight="muidocs-icon-navigation-expand-more"/>
            <DrawerContainer />
            <ModalRoot />
            <div style={this.getStyles().root}>
              <div className="row">
                <div className="col-xs-12 col-sm-6 col-md-4">
                  <div className="box">
                    <PackCard />
                  </div>
                </div>
                <div className="col-xs-12 col-sm-6 col-md-4">
                  <div className="box">
                    <PackCard />
                  </div>
                </div>
                <div className="col-xs-12 col-sm-6 col-md-4">
                  <div className="box">
                    <PackCard />
                  </div>
                </div>
                <div className="col-xs-12 col-sm-6 col-md-4">
                  <div className="box">
                    <PackCard />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </MuiThemeProvider>
      );
    }
}

export default App;
