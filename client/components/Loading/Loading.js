import React from 'react';
import { Loader } from 'semantic-ui-react';

import s from './Loading.css';

const Loading = () => (
  <div className={s.root}>
    <Loader
      active
      inline="centered"
      size="big"
    />
  </div>
);

export default Loading;
