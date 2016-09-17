import React from 'react';
import AppBar from 'material-ui/AppBar';
import { spacing } from 'material-ui/styles';

import DrawerContainer from './containers/DrawerContainer';

import ModalRoot from './containers/ModalRoot';

const style = {
  paddingLeft: 256,
  margin: spacing.desktopGutter,
};

const Home = ({ children }) => (
  <div>
    <AppBar title="Easylearn" />
    <DrawerContainer />
    <div style={style}>
      {children}
    </div>
    <ModalRoot />
  </div>
);

Home.propTypes = {
  children: React.PropTypes.element,
};

export default Home;
