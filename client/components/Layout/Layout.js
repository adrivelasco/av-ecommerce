import React from 'react';
import PropTypes from 'prop-types';
import { Container, Button, Menu, Icon } from 'semantic-ui-react';

import styles from './Layout.css';

const Layout = ({ children, history, location }) => {
  return (
    <div className={styles.root}>
      <Menu fixed="top" inverted>
        <Container>
          <Menu.Item header>
            AV eCommerce
          </Menu.Item>
          <Menu.Item
            name="home"
            active={location.pathname === '/'}
            onClick={() => history.push('/')}
          />
          <Menu.Menu position="right">
            <Menu.Item>
              <Button
                primary
                onClick={() => history.push('/cart')}
                active={location.pathname === '/cart'}
              >
                <Icon className={styles.shopIcon} style={{ margin: '0' }} name="shop" />
              </Button>
            </Menu.Item>
          </Menu.Menu>
        </Container>
      </Menu>
      <Container>
        {children}
      </Container>
    </div>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func
  }).isRequired,
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired
  }).isRequired
};

export default Layout;
