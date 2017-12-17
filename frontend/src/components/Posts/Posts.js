import React from 'react';
import { Route, withRouter } from 'react-router-dom';

import PostDetail from './Detail/Detail';
import CreatePost from './Create/Create';

const Posts = (props) => {
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

export default withRouter(Posts)