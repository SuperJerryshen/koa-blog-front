import _ from 'lodash';
import PropTypes from 'prop-types';
import React from 'react';
import { Container, Image, Menu, Icon, Segment } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

import logo from 'resources/logo.png';

const NavbarDesktop = ({ leftItems, rightItems }) => (
  <Segment inverted basic>
    <Menu inverted pointing secondary>
      <Container>
        <Menu.Item as={Link} to="/">
          <Icon name="home" />
          主页
        </Menu.Item>
        {_.map(leftItems, item => <Menu.Item {...item} />)}
        <Menu.Menu position="right">
          {_.map(rightItems, item => <Menu.Item {...item} />)}
        </Menu.Menu>
      </Container>
    </Menu>
  </Segment>
);

NavbarDesktop.propTypes = {
  leftItems: PropTypes.arrayOf(PropTypes.object),
  rightItems: PropTypes.arrayOf(PropTypes.object),
};

export default NavbarDesktop;
