import React from 'react';
import PropTypes from 'prop-types';
import { Header } from 'semantic-ui-react';

import s from './Head.css';

const Head = ({ children }) => {
  return (
    <div className={s.root}>
      <Header as="h1">
        {children}
      </Header>
    </div>
  );
};

Head.propTypes = {
  children: PropTypes.node
};

export default Head;
