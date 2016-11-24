import React from 'react';
import mdlUpgrade from '../../utils/mdlUpgrade';

const Loading = () => (
  <div
    className="mdl-spinner mdl-js-spinner is-active"
  />
);

export default mdlUpgrade(Loading);
