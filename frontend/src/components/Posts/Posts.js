import React, { Component } from 'react';
// import { withRouter } from 'react-router';
import { Route, withRouter } from 'react-router-dom';

import PostDetail from './Detail/Detail';
import Home from '../Home/Home';
import CreatePost from './Create/Create';

class Posts extends Component {
  render() {
    let match = this.props.match;

    return (
      <div>
        <Route 
          path={match.url + '/create'}
          component={CreatePost}
        />
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