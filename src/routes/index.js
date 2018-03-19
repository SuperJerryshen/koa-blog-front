import React from 'react';
import { Route, Link, Switch } from 'react-router-dom';
import Loadable from 'react-loadable';
import { Loader, Modal, Header, Icon, Button } from 'semantic-ui-react';

const Loading = props => {
  const ErrorComp = (
    <Modal open={true} basic size="small">
      <Header icon="remove circle" content="加载失败" />
      <Modal.Content>
        <h3>请确认网络连接！点击确定刷新页面</h3>
      </Modal.Content>
      <Modal.Actions>
        <Button color="green" onClick={this.handleClose} inverted>
          <Icon name="refresh" /> 确定
        </Button>
      </Modal.Actions>
    </Modal>
  );
  return props.error ? ErrorComp : <Loader active inline="centered" />;
};

const WelcomeRoute = Loadable({
  loader: () => import('./Welcome'),
  loading: Loading,
});
const HomeRoute = Loadable({
  loader: () => import('./Home'),
  loading: Loading,
});
const PostDetailRoute = Loadable({
  loader: () => import('./PostDetail'),
  loading: Loading,
});
const SignInRoute = Loadable({
  loader: () => import('./SignIn'),
  loading: Loading,
});
const MeRoute = Loadable({
  loader: () => import('./Me'),
  loading: Loading,
});
const NewPostRoute = Loadable({
  loader: () => import('./NewPost'),
  loading: Loading,
});
const EditPostRoute = Loadable({
  loader: () => import('./EditPost'),
  loading: Loading,
});
const SignUpRoute = Loadable({
  loader: () => import('./SignUp'),
  loading: Loading,
});

const Routes = () => (
  <Switch>
    <Route component={WelcomeRoute} path="/welcome" />
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
