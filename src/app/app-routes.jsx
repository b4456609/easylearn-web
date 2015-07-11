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



/** Routes: https://github.com/rackt/react-router/blob/master/docs/api/components/Route.md
  *
  * Routes are used to declare your view hierarchy.
  *
  * Say you go to http://material-ui.com/#/components/paper
  * The react router will search for a route named 'paper' and will recursively render its
  * handler and its parent handler like so: Paper > Components > Master
  */

let AppRoutes = (
  <Route name="root" path="/" handler={Master}>
    <Route name="home" handler={Home} />
    <Route name="new-pack" handler={NewPack} />
    <Route name="view-pack" handler={ViewPack} />
    <Route name="delete-pack" handler={DeletePack} />
    <Route name="modified-pack" handler={ModifiedPack} />
    <Route name="folder-list" handler={FolderList} />
    <DefaultRoute handler={Home}/>
  </Route>
);

module.exports = AppRoutes;
