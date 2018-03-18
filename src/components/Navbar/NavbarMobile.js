import PropTypes from 'prop-types';
import React from 'react';
import { Icon, Image, Menu, Sidebar, Segment } from 'semantic-ui-react';
import { history, Link } from 'react-router-dom';

import logo from 'resources/logo.png';
import * as styles from './NavbarMobile.less';

const NavbarMobile = ({
  children,
  leftItems,
  onPusherClick,
  onToggle,
  rightItems,
  visible,
}) => (
  <Sidebar.Pushable>
    <Sidebar
      as={Menu}
      animation="push"
      icon="labeled"
      size="tiny"
      inverted
      items={[...leftItems, ...rightItems]}
      direction="right"
      vertical
      visible={visible}
      onItemClick={onToggle}
      width="thin"
    />
    <Sidebar.Pusher
      dimmed={visible}
      onClick={onPusherClick}
      className={styles.pusher}
      style={{ minHeight: document.body.offsetHeight }}
    >
      <Segment inverted basic>
        <Menu inverted pointing secondary>
          <Menu.Item as={Link} to="/">
            <Icon name="home" />
            主页
          </Menu.Item>
          <Menu.Menu position="right">
            <Menu.Item onClick={onToggle}>
              <Icon name="sidebar" />
            </Menu.Item>
          </Menu.Menu>
        </Menu>
      </Segment>
      {children}
    </Sidebar.Pusher>
  </Sidebar.Pushable>
);

NavbarMobile.propTypes = {
  children: PropTypes.node,
  leftItems: PropTypes.arrayOf(PropTypes.object),
  onPusherClick: PropTypes.func.isRequired,
  onToggle: PropTypes.func.isRequired,
  rightItems: PropTypes.arrayOf(PropTypes.object),
  visible: PropTypes.bool.isRequired,
};

export default NavbarMobile;
