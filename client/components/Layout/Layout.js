import React from 'react';
import { Container } from 'semantic-ui-react';

import Head from '../Head/Head';

const Layout = ({ children }) => {
  return (
    <div>
      <Container>
        <Head>AV eCommerce</Head>
        {children}
      </Container>
    </div>
  );
};

export default Layout;
