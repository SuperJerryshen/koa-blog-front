import React from 'react';
import { Route, Link, Switch } from 'react-router-dom';

import WelcomeRoute from './Welcome';
import HomeRoute from './Home';
import PostDetailRoute from './PostDetail';
import LoginRoute from './Login';
import MeRoute from './Me';
import NewPostRoute from './NewPost';
import EditPostRoute from './EditPost';

const Routes = () => (
  <Switch>
    <Route exact component={WelcomeRoute} path="/welcome" />
    <Route exact component={HomeRoute} path="/" />
    <Route component={PostDetailRoute} path="/post/:id" />
    <Route component={LoginRoute} path="/login" />
    <Route component={MeRoute} path="/me" />
    <Route component={NewPostRoute} path="/newpost" />
    <Route component={EditPostRoute} path="/edit/:id" />
  </Switch>
);

export default Routes;
