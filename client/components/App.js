import React from 'react';
import { Switch, Route } from 'react-router-dom';

import ScrollToTop from './ScrollToTop/ScrollToTop';
import Layout from './Layout/Layout';
import views from '../views';

const App = () => {
  return (
    <ScrollToTop>
      <Route render={({ location, history }) => {
        return (
          <Layout
            location={location}
            history={history}
          >
            <Switch>
              {views.map((view, i) => {
                return (
                  <Route
                    key={i}
                    path={view.path}
                    exact={view.exact}
                    pageName={view.title}
                    render={props =>
                      <view.component {...props} />
                    }
                  />
                );
              })}
            </Switch>
          </Layout>
        );
      }} />
    </ScrollToTop>
  );
};

export default App;
