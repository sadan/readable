import React, { Component } from 'react';
import { withRouter } from 'react-router';
import { Route } from 'react-router-dom';

import PostDetail from './PostDetail/PostDetail';
import Home from '../Home/Home';

class Posts extends Component {
  render() {
    let match = this.props.match;

    return (
      <div>
        <Route
          path={match.url + '/detail/:id'}
          component={PostDetail}
        />
        <Route 
          path={match.url + '/category/:category'}
          component={Home}
        />
      </div>
    );
  }
}

export default withRouter(Posts);