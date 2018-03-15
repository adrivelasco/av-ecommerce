import React from 'react';
import { Container, Button, Menu, Icon } from 'semantic-ui-react';

import s from './Layout.css';

const Layout = ({ children, history, location }) => {
  return (
    <div className={s.root}>
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
                <Icon name="shop" />
                My cart
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

export default Layout;
