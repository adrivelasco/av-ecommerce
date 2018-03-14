import React from 'react';
import { Container, Dropdown, Image, Menu } from 'semantic-ui-react';

import s from './Layout.css';

const Layout = ({ children }) => {
  return (
    <div className={s.root}>
      <Menu fixed='top' inverted>
        <Container>
          <Menu.Item as='a' header>
            AV-ECOMMERCE
          </Menu.Item>
        </Container>
      </Menu>
      <Container>
        {children}
      </Container>
    </div>
  );
};

export default Layout;
