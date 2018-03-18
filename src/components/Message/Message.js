import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { map } from 'lodash';
import Notice from './Notice';

const states = {
  _items: [],
  get items() {
    return this._items;
  },
  set items(val) {
    _setState(val);
    this._items = val;
  },
};

let _setState;
let destroyTimer;

class Notification extends Component {
  state = {
    items: [],
  };

  onHide = data => {
    // states.items = states.items.filter(notice => notice.key !== data.key);
  };

  componentWillMount() {
    const _this = this;
    _setState = val => {
      _this.setState({
        items: val,
      });
    };
  }

  componentWillUnmount() {
    _setState = null;
  }

  render() {
    const { items } = this.state;
    return (
      <div>
        {map(items, (item, idx) => (
          <Notice key={idx} data={item} onHide={this.onHide} />
        ))}
      </div>
    );
  }
}

class Message {
  constructor() {
    this.wrap = null;
  }

  init() {
    if (this.wrap) {
      return;
    }
    const wrap = document.createElement('div');
    this.wrap = wrap;
    document.body.appendChild(wrap);
    ReactDOM.render(<Notification />, wrap);
  }

  destroy() {
    ReactDOM.unmountComponentAtNode(this.wrap);
    this.wrap.remove();
    this.wrap = null;
  }

  show(item) {
    this.init();
    // 如果销毁dom的定时器存在，则清空定时器
    // if (destroyTimer) {
    //   clearTimeout(destroyTimer);
    //   destroyTimer = null;
    // }
    item.key = new Date().valueOf();
    states.items = [...states.items, item];
  }

  hide() {
    if (states.items.length === 0) {
      return;
    }
    const { items } = states;
    items.shift();

    states.items = items;
  }

  success(msg, interval = 2, duration = 400) {
    this.show({
      msg,
      interval,
      duration,
      type: 'success',
    });
  }

  error(msg, interval = 2, duration = 400) {
    this.show({
      msg,
      interval,
      duration,
      type: 'error',
    });
  }

  info(msg, interval = 2, duration = 400) {
    this.show({
      msg,
      interval,
      duration,
      type: 'info',
    });
  }
}

export default new Message();
