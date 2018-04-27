import React from 'react';
import { Loader } from 'semantic-ui-react';

import styles from './Loading.css';

const Loading = () => (
  <div className={styles.root}>
    <Loader
      active
      inline="centered"
      size="big"
    />
  </div>
);

export default Loading;
