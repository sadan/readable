import React, { Component } from 'react';
import { Row, Col, Media, Glyphicon } from 'react-bootstrap';
import { connect } from 'react-redux';

import { fetchPostComments } from './actions';
import { sortByScore, convertDate } from '../../../utils';
import CommentDetail from '../Detail/CommentDetail';

class Comment extends Component {
  constructor(props) {
    super(props);

    this.state = {
      postId: props.postId
    };

    // this.voteHandler = this.voteHandler.bind(this);
    this.editHandler = this.editHandler.bind(this);
  }

  componentWillMount() {
    let { fetchPostComments } = this.props;

    fetchPostComments(this.state.postId);
  }

  // voteHandler(commentId, e) {
  //   let { commentVote } = this.props;

  //   commentVote(commentId, e.target.id);
  // }

  editHandler() {
    this.setState({ edit: true });
  }

  render() {
    let comments = this.props.comments;
    let {edit} = this.state;

    if (!comments.length) return null;
    else comments = comments.length ? comments.sort(sortByScore) : null;

    return(
      <div>
        {comments.map((comment) => (
          <CommentDetail comment={comment}/>
        ))}
      </div>
    );
  }
}

let mapStateToProps = state => ({
  comments: state.postComments
});

let mapDispatchToProps = {
  fetchPostComments
};

export default connect(mapStateToProps, mapDispatchToProps)(Comment);
