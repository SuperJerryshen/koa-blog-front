import React, { Component } from 'react';

class Page extends Component {
  componentWillMount() {
    document.title = this.props.title;
  }
  render() {
    return <div>{this.props.children}</div>;
  }
}

export default Page;
