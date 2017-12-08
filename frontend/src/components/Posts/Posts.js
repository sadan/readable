import React, { Component } from 'react';
// import { withRouter } from 'react-router';
import { Route, withRouter } from 'react-router-dom';

import PostDetail from './Detail/Detail';
import Home from '../Home/Home';
import CreatePost from './Create/Create';

export default function Posts (props) {
  let match = props.match;

  return (
    <div>
      <Route 
        path={match.url + '/create'} 
        component={CreatePost}
      />
      <Route
        path={match.url + '/:category/:id'}
        component={PostDetail}
      />
    </div>
  );
}
