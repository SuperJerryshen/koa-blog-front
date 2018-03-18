import React, { Component } from 'react';
import { Link, BrowserRouter as Router } from 'react-router-dom';
import Routes from './routes';
import { http, store } from './utils';
import { TOKEN_KEY, USER_ID } from './utils/const';
import 'styling/semantic.less';

import { Navbar, Page, Footer } from 'components';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      leftItems: [],
      rightItems: [
        {
          as: Link,
          content: '注册',
          icon: 'add user',
          to: '/signup',
          key: 'signup',
        },
        {
          as: Link,
          content: '登录',
          icon: 'user circle',
          to: '/signin',
          key: 'signin',
        },
      ],
    };
  }

  componentWillMount() {
    http({
      url: '/user/auth',
      method: 'post',
    }).then(res => {
      const { data, success } = res.data;
      const { rightItems } = this.state;
      if (success) {
        this.setState({
          rightItems: [
            {
              as: Link,
              content: data.nickname,
              icon: 'user circle',
              to: '/me',
              key: 'me',
            },
            {
              as: Link,
              content: '写文章',
              icon: 'write',
              to: '/newpost',
              key: 'new post',
            },
          ],
        });
      } else {
        store.rm([TOKEN_KEY, USER_ID]);
      }
    });
  }

  render() {
    const { leftItems, rightItems } = this.state;
    return (
      <Router>
        <Navbar leftItems={leftItems} rightItems={rightItems}>
          <Page title="经纬天地">
            <Routes />
            <Footer />
          </Page>
        </Navbar>
      </Router>
    );
  }
}

export default App;
