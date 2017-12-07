import React, { Component } from 'react';
import { Row, Col, Media, Glyphicon } from 'react-bootstrap';
import { convertDate } from '../../../../utils/helpers';

import { _commentVote, _deleteComment } from './actions';
import { connect } from 'react-redux';
import CreateComment from '../Create/Create';

class CommentDetail extends Component {
  constructor(props) {
    super(props);

    this.state = {
      edit: false
    };

    this.voteHandler = this.voteHandler.bind(this);
    this.editHandler = this.editHandler.bind(this);
    this.deleteHandler = this.deleteHandler.bind(this);
  }

  voteHandler(commentId, e) {
    let { _commentVote } = this.props;

    _commentVote(commentId, e.target.id);
  }

  editHandler() {
    this.setState({ edit: true });
  }

  deleteHandler(commentId) {
    let { _deleteComment } = this.props;

    _deleteComment(commentId);
  }

  render() {
    let { comment } = this.props;
    let { edit } = this.state;
    
    if (edit)  return <CreateComment comment={comment} />;

    return (
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
                <span onClick={this.editHandler} className='edit-btn'>Edit</span>
                <span style={{color: '#a0a0a0'}}> | </span>
                <span onClick={() => this.deleteHandler(comment.id)} className='edit-btn'>Delete</span>
                <span style={{color: '#a0a0a0'}}> | </span>
                <span style={{color: '#a0a0a0'}}>By {comment.author} at {convertDate(comment.timestamp)}</span>
              </Media.Body>
            </Media>
          </div>
        </Col>
      </Row>
    );
  }
}

export default connect(null, {_commentVote, _deleteComment})(CommentDetail);