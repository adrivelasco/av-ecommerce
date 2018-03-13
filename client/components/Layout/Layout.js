import React from 'react';
import { Container } from 'semantic-ui-react';

import AppBar from '../AppBar/AppBar';

const Layout = ({ children }) => {
  return (
    <div>
      <Container>
        <AppBar>AV eCommerce</AppBar>
        {children}
      </Container>
    </div>
  );
};

export default Layout;
