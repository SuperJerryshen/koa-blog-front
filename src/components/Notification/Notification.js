import React, { Component } from 'react';
import ReactDom from 'react-dom';

class Notification extends Component {
  state = {
    notices: [],
  };

  add(notice) {
    const { notices } = this.state;
  }

  remove() {}

  render() {
    return <div />;
  }
}

export default Notification;
