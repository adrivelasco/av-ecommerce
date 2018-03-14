import React from 'react';
import { Header, Icon, Button } from 'semantic-ui-react'

import s from './NotFound.css';

const NotFound = ({ history }) => {
  return (
    <div className={s.root}>
      <Header as="h1" icon>
        <Icon name="warning" />
        404
        <Header.Subheader>
          Oops. Looks like this page doesnt't exist.
        </Header.Subheader>
        <br />
        <Button primary onClick={(e) => history.push('/')}>Back to Home</Button>
      </Header>
    </div>
  );
};

export default NotFound;