import React, { PureComponent } from 'react';
import {
  Card,
  Loader,
  Image,
  Header,
  Button,
  Icon,
  Modal,
  Item,
} from 'semantic-ui-react';

import { Page } from '../../components';
import http from '../../utils/http';
import store from '../../utils/store';
import { TOKEN_KEY } from '../../utils/const';

class Me extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      info: null,
    };
  }

  handleLogout = e => {
    console.log(e);
    store.rm(TOKEN_KEY);
    location.pathname = '/';
  };

  handleModalShow = () => {
    this.setState({ show: true });
  };

  handleModalHide = () => {
    this.setState({ show: false });
  };

  componentWillMount() {
    http.post('/user').then(res => {
      const { data, success } = res.data;
      if (success) {
        this.setState({
          info: data,
        });
      } else {
        this.props.history.push('/');
      }
    });
  }

  render() {
    const { info, show } = this.state;
    if (!info) {
      return <Loader />;
    }
    return (
      <Page title="我的信息">
        <Header as="h2" textAlign="center">
          <Header.Content content="我的信息" />
        </Header>
        <Card
          fluid
          style={{
            padding: 16,
          }}
        >
          <Item.Group unstackable>
            <Item>
              <Item.Image size="small" src={info.avatar} />
              <Item.Content>
                <Item.Header as="a">{info.nickname}</Item.Header>
                <Item.Meta>{info.email}</Item.Meta>
                <Item.Extra>他很懒，什么也没留下。</Item.Extra>
              </Item.Content>
            </Item>
          </Item.Group>
        </Card>
        <Button color="red" icon fluid onClick={this.handleModalShow}>
          <Icon name="log out" />
          退出登录
        </Button>

        <Modal size="mini" open={show} onClose={this.handleModalHide}>
          <Modal.Header>退出登录</Modal.Header>
          <Modal.Content>
            <p>您确认要退出登录吗？</p>
          </Modal.Content>
          <Modal.Actions>
            <Button negative onClick={this.handleModalHide}>
              取消
            </Button>
            <Button
              positive
              icon="checkmark"
              labelPosition="right"
              content="退出"
              onClick={this.handleLogout}
            />
          </Modal.Actions>
        </Modal>
      </Page>
    );
  }
}

export default Me;
