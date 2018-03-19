import React, { Component } from 'react';
import { Transition, Message, Icon } from 'semantic-ui-react';

const theme = {
  success: {
    color: 'green',
    icon: 'check circle',
  },
  error: {
    color: 'red',
    icon: 'warning circle',
  },
  info: {
    color: 'grey',
    icon: 'info circle',
  },
};

class Notice extends Component {
  state = {
    show: true,
  };

  clearCloseTimer() {
    this.closeTimer && clearTimeout(this.closeTimer);
    this.closeTimer = null;
  }

  close(data) {
    const { onClose } = this.props;
    this.clearCloseTimer();
    this.setState({
      show: false,
    });
    this.timer = setTimeout(() => {
      if (onClose) {
        onClose(data);
      }
      clearTimeout(this.timer);
      this.timer = null;
    }, 500);
  }

  componentDidMount() {
    const { data, onHide } = this.props;
    this.closeTimer = setTimeout(() => {
      this.close(data);
    }, data.interval * 1000 + 500);
  }

  componentWillUnmount() {
    this.clearCloseTimer();
  }

  render() {
    const { data } = this.props;
    const { show } = this.state;
    const { type, msg } = data;

    return (
      <div
        style={{
          position: 'fixed',
          top: 60,
          left: '50%',
          transform: 'translateX(-50%)',
        }}
      >
        <Transition transitionOnMount visible={show} animation="fade down">
          <Message color={theme[type].color} size="mini">
            <Icon name={theme[type].icon} size="large" /> {msg}
          </Message>
        </Transition>
      </div>
    );
  }
}

export default Notice;
