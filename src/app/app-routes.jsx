let React = require('react');
let Router = require('react-router');
let Route = Router.Route;
let Redirect = Router.Redirect;
let DefaultRoute = Router.DefaultRoute;

// Here we define all our material-ui ReactComponents.
let Master = require('./components/master');
let Home = require('./components/pages/home');
let NewPack = require('./components/pages/new-pack');
let ViewPack = require('./components/pages/view-pack');
let DeletePack = require('./components/pages/delete-pack');
let ModifiedPack = require('./components/pages/modified-pack');
let FolderList = require('./components/pages/folder-list');
let FolderManerger = require('./components/pages/folder-manerger.jsx');

/** Routes: https://github.com/rackt/react-router/blob/master/docs/api/components/Route.md
  *
  * Routes are used to declare your view hierarchy.
  *
  * Say you go to http://material-ui.com/#/components/paper
  * The react router will search for a route named 'paper' and will recursively render its
  * handler and its parent handler like so: Paper > Components > Master
  */

let AppRoutes = (
  <Route handler={Master} name="root" path="/">
    <Route handler={Home} name="home"/>
    <Route handler={NewPack} name="new-pack"/>
    <Route handler={ViewPack} name="view-pack"/>
    <Route handler={DeletePack} name="delete-pack"/>
    <Route handler={ModifiedPack} name="modified-pack"/>
    <Route handler={FolderList} name="folder-list"/>
    <Route handler={FolderManerger} name="folder-manerger"/>
    <DefaultRoute handler={Home}/>
  </Route>
);

module.exports = AppRoutes;
