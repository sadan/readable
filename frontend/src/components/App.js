import React, { Component } from 'react';
import { withRouter, Route, Switch } from 'react-router-dom';

import { Grid } from 'react-bootstrap';

import Topbar from './common/Topbar';
import Home from './Home/Home';
import Posts from './Posts/Posts';
import NotFound from '../components/common/NotFound';

class App extends Component {
  render() {
    return (
      <div>
        <Topbar />

        <Grid>
          <Switch>
            <Route 
              path='/'
              exact
              component={Home}
            />
            <Route
              path='/posts'
              component={Posts}
            />
            <Route
              path='/404'
              component={NotFound}
            />
          </Switch>
        </Grid>
      </div>
    );
  }
}

export default withRouter(App);
