import React from 'react';
import { Route, Link, Switch } from 'react-router-dom';

import WelcomeRoute from './Welcome';
import HomeRoute from './Home';
import PostDetailRoute from './PostDetail';
import SignInRoute from './SignIn';
import MeRoute from './Me';
import NewPostRoute from './NewPost';
import EditPostRoute from './EditPost';
import SignUpRoute from './SignUp';

const Routes = () => (
  <Switch>
    <Route exact component={WelcomeRoute} path="/welcome" />
    <Route exact component={HomeRoute} path="/" />
    <Route component={PostDetailRoute} path="/post/:id" />
    <Route component={SignInRoute} path="/signin" />
    <Route component={MeRoute} path="/me" />
    <Route component={NewPostRoute} path="/newpost" />
    <Route component={EditPostRoute} path="/edit/:id" />
    <Route component={SignUpRoute} path="/signup" />
  </Switch>
);

export default Routes;
