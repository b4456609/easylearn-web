import React from 'react';
import PackCard from './components/PackCard';


const FolderView = () => (
  <div>
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
);
export default FolderView;
