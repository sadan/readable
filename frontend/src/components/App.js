import React, { Component } from 'react';
import { withRouter, Route, Switch } from 'react-router-dom';

import { Grid } from 'react-bootstrap';

import Topbar from './common/Topbar';
import Home from './Home/Home';

class App extends Component {
  render() {
    return (
      <div>
        <Topbar />

        <Grid>
          <Switch>
            <Route 
              path=''
              component={Home}
            />
          </Switch>
        </Grid>
      </div>
    );
  }
}

export default withRouter(App);
