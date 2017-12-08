import React, { Component } from 'react';
import { Row, Col, Media, Glyphicon } from 'react-bootstrap';
import { connect } from 'react-redux';

import { _fetchPostComments } from './actions';
import { sortByScore } from '../../../../utils/helpers';
import CommentDetail from '../Detail/CommentDetail';

class Comment extends Component {
  constructor(props) {
    super(props);

    this.state = {
      postId: props.postId
    }
  }

  componentWillMount() {
    let { _fetchPostComments } = this.props;

    _fetchPostComments(this.state.postId)
  }

  render() {
    let comments = this.props.comments;

    if (!comments.length) return null;
    else comments = comments.length ? comments.sort(sortByScore) : null;

    return(
      <div>
        {comments.map((comment, index) => (
          <CommentDetail key={index} comment={comment}/>
        ))}
      </div>
    );
  }
}

let mapStateToProps = state => ({
  comments: state.postComments
});

let mapDispatchToProps = {
  _fetchPostComments
};

export default connect(mapStateToProps, mapDispatchToProps)(Comment);
