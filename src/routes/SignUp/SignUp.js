import React, { Component } from 'react';
import {
  Segment,
  Header,
  Form,
  Divider,
  Button,
  Image,
  Message,
  Icon,
  Label,
} from 'semantic-ui-react';
import { Link } from 'react-router-dom';

import { Page } from '../../components';
import { http, store } from '../../utils';
import { USER_ID, TOKEN_KEY } from '../../utils/const';
import PicUploader from './PicUploader';

import avatar from '../../resources/avatar.jpg';

class SignUp extends Component {
  state = {
    loading: false,
    password: '',
    pwdConfirm: '',
    nickname: '',
    email: '',
    avatar,
    tagVisible: true,
  };

  handleInputChange = (e, { name, value }) => {
    this.setState({
      [name]: value,
    });
  };

  handleSubmit = () => {
    const { password, pwdConfirm, nickname, email, avatar } = this.state;
    const { history } = this.props;
    if (password !== pwdConfirm || !nickname || !email || !avatar) {
      console.log('验证失败');
    } else {
      this.setState({
        loading: true,
      });
      http
        .post('/user/signup', {
          email,
          nickname,
          avatar,
          password,
        })
        .then(res => {
          this.setState({
            loading: false,
          });
          const { success, data } = res.data;
          if (success) {
            store.set(TOKEN_KEY, data.token);
            store.set(USER_ID, data.id);
            location.replace('/');
          }
        });
    }
  };

  isFormUnvalid = () => {
    const { password, pwdConfirm, nickname, email, avatar } = this.state;

    if (
      password !== pwdConfirm ||
      nickname.length === 0 ||
      email.length === 0 ||
      avatar.length === 0 ||
      pwdConfirm.length === 0 ||
      password.length === 0
    ) {
      return true;
    }

    return false;
  };

  render() {
    const {
      password,
      pwdConfirm,
      loading,
      nickname,
      email,
      avatar,
      show,
    } = this.state;
    return (
      <Page title="用户注册">
        <Header as="h2" textAlign="center">
          <Header.Content content="用户注册" />
        </Header>
        <Segment basic>
          <Form loading={loading} onSubmit={this.handleSubmit}>
            <Form.Input
              type="email"
              name="email"
              icon="mail"
              fluid
              label="电子邮箱"
              placeholder="请输入电子邮箱账户名"
              onChange={this.handleInputChange}
              value={email}
              required
            />
            <Form.Input
              type="text"
              name="nickname"
              icon="user circle"
              fluid
              label="昵称"
              placeholder="请输入你的昵称"
              onChange={this.handleInputChange}
              value={nickname}
              required
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
              required
            />
            <Form.Input
              type="password"
              name="pwdConfirm"
              icon="lock"
              fluid
              label="确认密码"
              placeholder="请再次输入您的密码"
              onChange={this.handleInputChange}
              value={pwdConfirm}
              error={password !== pwdConfirm}
              required
            />
            <Form.Field>
              <label>上传头像</label>
              <PicUploader
                name="avatar"
                avatar={avatar}
                onChange={this.handleInputChange}
              />
            </Form.Field>
            <Form.Button
              disabled={this.isFormUnvalid()}
              color="blue"
              content="注册"
              fluid
            />
          </Form>
          <Message warning>
            <Icon name="help" />
            已经注册过了？&nbsp;点击 <Link to="/signin">这里</Link>&nbsp;登录。
          </Message>
        </Segment>
      </Page>
    );
  }
}

export default SignUp;
