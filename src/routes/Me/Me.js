import React, { PureComponent } from 'react';
import {
  Card,
  Loader,
  Image,
  Header,
  Button,
  Icon,
  Modal,
  Portal,
} from 'semantic-ui-react';
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
      <div>
        <Header as="h2" textAlign="center">
          <Header.Content content="我的信息" />
        </Header>
        <Card fluid>
          <Image src={info.avatar} />
          <Card.Content>
            <Card.Header content={info.nickname} />
            <Card.Meta content={info.email} />
            <Card.Description content={info.id} />
          </Card.Content>
        </Card>
        <Button color="red" icon fluid onClick={this.handleLogout}>
          <Icon name="log out" />
          退出登录
        </Button>

        {/*<Modal size="mini" open={show} onClose={this.handleModalHide}>
          <Modal.Header>退出登录</Modal.Header>
          <Modal.Content>
            <p>您确认要退出登录吗？</p>
          </Modal.Content>
          <Modal.Actions>
            <Button negative>取消</Button>
            <Button
              positive
              icon="checkmark"
              labelPosition="right"
              content="退出"
            />
          </Modal.Actions>
    </Modal>*/}
      </div>
    );
  }
}

export default Me;
