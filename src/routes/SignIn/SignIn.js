import React, { PureComponent } from 'react';
import { Form, Segment, Header, Icon } from 'semantic-ui-react';

import { store, http } from '../../utils';
import { TOKEN_KEY, USER_ID } from '../../utils/const';
import { Page } from '../../components';

class SignIn extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      loading: false,
    };
  }

  handleInputChange = (e, { name, value }) => {
    this.setState({
      [name]: value,
    });
  };

  handleSubmit = () => {
    const { email, password } = this.state;
    http({
      method: 'post',
      url: '/user/login',
      data: {
        email,
        password,
      },
    }).then(
      res => {
        const { data, success } = res.data;
        if (success) {
          store.set(TOKEN_KEY, data.token);
          store.set(USER_ID, data.id);
          location.pathname = '/';
        }
      },
      err => {
        console.log(err);
      }
    );
  };

  render() {
    const { email, password } = this.state;
    return (
      <Page title="用户登录">
        <Header as="h2" textAlign="center">
          <Header.Content content="用户登录" />
        </Header>
        <Segment padded color="black">
          <Form loading={this.state.loading} onSubmit={this.handleSubmit}>
            <Form.Input
              type="email"
              name="email"
              icon="mail"
              fluid
              label="电子邮箱"
              placeholder="请输入电子邮箱账户名"
              onChange={this.handleInputChange}
              value={email}
            />
            <Form.Input
              type="password"
              name="password"
              icon="lock"
              fluid
              label="登录密码"
              placeholder="请输入您的密码"
              onChange={this.handleInputChange}
              value={password}
            />
            <Form.Button color="blue" content="登录" fluid />
          </Form>
        </Segment>
      </Page>
    );
  }
}

export default SignIn;
