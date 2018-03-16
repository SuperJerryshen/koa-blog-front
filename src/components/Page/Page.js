import React, { Component } from 'react';

class Page extends Component {
  componentWillMount() {
    document.title = this.props.title;
  }
  render() {
    const params = this.props;
    return (
      <div
        {...params}
        style={{
          padding: '16px 0',
        }}
      >
        {this.props.children}
      </div>
    );
  }
}

export default Page;
