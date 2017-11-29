import React, { Component } from 'react';
import { Row, Col, Media, Glyphicon } from 'react-bootstrap';
import { connect } from 'react-redux';

import { fetchPostComments, commentVote } from './actions';
import { sortByScore, convertDate } from '../../utils';

class Comment extends Component {
  constructor(props) {
    super(props);

    this.state = {
      postId: props.postId
    };

    this.voteHandler = this.voteHandler.bind(this);
  }

  componentWillMount() {
    let { fetchPostComments } = this.props;

    fetchPostComments(this.state.postId);
  }

  voteHandler(commentId, e) {
    let { commentVote } = this.props;

    commentVote(commentId, e.target.id);
  }

  render() {
    let comments = this.props.comments;

    if (!comments.length) return null;
    else comments = comments.length ? comments.sort(sortByScore) : null;

    return(
      <div>
        {comments.map((comment) => 
          <Row key={comment.id}>
            <Col md={12}>
              <div style={{
                borderBottom: '1px solid #e4e6e8'
              }}>
                <Media className='comment-media'>
                  <Media.Left>
                    <div style={{display: 'inline-grid'}}>
                      <span className='comment-vote-score'>{comment.voteScore}</span>
                      <Glyphicon 
                        glyph='chevron-up' 
                        className='comment-vote-icon' 
                        id='upVote'
                        onClick={e => this.voteHandler(comment.id, e)}/>
                      <Glyphicon 
                        className='comment-vote-icon'
                        glyph='chevron-down'
                        id='downVote'
                        onClick={e => this.voteHandler(comment.id, e)} />
                    </div>
                  </Media.Left>
                  <Media.Body>
                    <p>{comment.body}</p>
                    <span style={{color: '#a0a0a0'}}>By {comment.author} at {convertDate(comment.timestamp)}</span>
                  </Media.Body>
                </Media>
              </div>
            </Col>
          </Row>)
        }
      </div>
    );
  }
}

let mapStateToProps = state => ({
  comments: state.postComments
});

let mapDispatchToProps = {
  fetchPostComments,
  commentVote
};

export default connect(mapStateToProps, mapDispatchToProps)(Comment);
