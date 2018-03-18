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

  componentDidMount() {
    const { data, onHide } = this.props;
    setTimeout(() => {
      this.setState({
        show: false,
      });
      onHide(data);
    }, data.interval * 1000);
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
