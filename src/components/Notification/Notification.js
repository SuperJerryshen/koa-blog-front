import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { map } from 'lodash';
import Notice from './Notice';

const notification = Comp => {
  // items属性分别设置setter和getter
  // 设定值的时候触发Notification的setState
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
  let wrap = null;

  return class Notification extends Component {
    state = {
      items: [],
    };

    onClose = data => {
      states.items = states.items.filter(notice => notice.key !== data.key);
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
          {map(items, item => (
            <Comp key={item.key} data={item} onClose={this.onClose} />
          ))}
        </div>
      );
    }

    static init() {
      if (this.wrap) {
        return;
      }
      const wrap = document.createElement('div');
      this.wrap = wrap;
      document.body.appendChild(wrap);
      ReactDOM.render(<Notification />, wrap);
    }

    static destroy() {
      ReactDOM.unmountComponentAtNode(this.wrap);
      this.wrap.remove();
      this.wrap = null;
    }

    /**
     * 展示消息
     * @param {*} param 
     * @param {*} param.msg
     * @param {*} param.interval
     * @param {*} param.duration
     */
    static show(param) {
      this.init();
      param.key = new Date().valueOf();
      states.items = [...states.items, param];
    }

    static hide() {
      const { items } = states;
      items.shift();
      states.items = items;

      if (states.items.length === 0) {
        return this.destroy();
      }
    }
  };
};

export default notification;
