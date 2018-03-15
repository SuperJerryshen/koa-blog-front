import React, { Component } from 'react';
import { Link, BrowserRouter as Router } from 'react-router-dom';
import Routes from './routes';
import http from './utils/http';
import 'styling/semantic.less';

import { Navbar } from 'components';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      leftItems: [
        {
          as: Link,
          content: 'Home',
          to: '/',
          icon: 'home',
          key: 'home',
        },
        // {
        //   as: Link,
        //   content: 'Welcome',
        //   to: '/welcome',
        //   icon: 'signing',
        //   key: 'welcome',
        // },
      ],
      rightItems: [
        {
          as: 'a',
          content: 'Github',
          href: 'https://github.com/SuperJerryshen',
          icon: 'github',
          key: 'github',
          target: '_blank',
        },
        {
          as: Link,
          content: 'Login',
          icon: 'user circle',
          to: '/login',
          key: 'login',
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
            rightItems[0],
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
      }
    });
  }

  render() {
    const { leftItems, rightItems } = this.state;
    return (
      <Router>
        <Navbar leftItems={leftItems} rightItems={rightItems}>
          <div
            style={{
              paddingTop: '16px',
              minHeight: document.body.offsetHeight - 61 + 'px',
            }}
          >
            <Routes />
          </div>
        </Navbar>
      </Router>
    );
  }
}

export default App;
