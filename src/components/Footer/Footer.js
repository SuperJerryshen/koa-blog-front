import React, { Component } from 'react';

import * as styles from './Footer.less';

class Footer extends Component {
  render() {
    return (
      <div className={styles.footer}>
        <p className={styles.text}>©️ 2018 ❤ JerryShen</p>
        <p className={styles.text}>
          基于 React 和 Semantic-UI，欢迎访问我的<a href="https://github.com/SuperJerryshen">
            GitHub主页
          </a>
        </p>
      </div>
    );
  }
}

export default Footer;
