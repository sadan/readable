import React, { Component } from 'react';
import { Row, Col, Clearfix, Media, Glyphicon } from 'react-bootstrap';
import { connect } from 'react-redux';

import { fetchPostDetail } from './actions';
import { convertDate, sortByScore } from '../../utils';

class PostDetail extends Component {
  componentDidMount() {
    let { postId, fetchPostDetail } = this.props;

    postId = postId ? postId : this.props.match.params.id;

    fetchPostDetail(postId);
  }

  render() {
    let {post, comments} = this.props;
    comments = comments.length ? comments.sort(sortByScore) : null;

    return (
      <div>
        <Row >
          <Col md={12}>
            <div style={{
              borderBottom: '1px solid #e4e6e8',
              marginBottom: '15px'
            }}>
              <h3>{post.title}</h3>
            </div>
          </Col>
        </Row>
        <Row>
          <Col md={12}>
            <div style={{
              borderBottom: '1px solid #e4e6e8'
            }}>
              <Row style={{marginBottom: '15px'}}>
                <Clearfix />
                <Col md={9}>
                  <Media>
                    <Media.Left style={{width: '8%'}}>
                      <div style={{display: 'inline-grid'}}>
                        <Glyphicon style={{fontSize: '26px', marginLeft: '1px'}} glyph='chevron-up' />
                        <span style={{margin: '5px auto', fontSize: '20px'}}>{post.voteScore}</span>
                        <Glyphicon style={{fontSize: '26px', marginLeft: '1px'}} glyph='chevron-down' />
                      </div>
                    </Media.Left>
                    <Media.Body>
                      <p>{post.body}</p>
                    </Media.Body>
                  </Media>
                </Col>
                <Col md={3}>
                  <p><span style={{
                    color: '#a0a0a0', 
                    width: '30%', 
                    display: 'inline-block'
                  }}>Posted by</span> {post.author}</p>
                  <p><span style={{
                    color: '#a0a0a0', 
                    width: '30%', 
                    display: 'inline-block'
                  }}>Posted at</span> {convertDate(post.timestamp)}</p>
                  <span className='post-category'>
                    {post.category}
                  </span>
                </Col>
              </Row>
            </div>
          </Col>
        </Row>
        {comments 
          ? comments.map((comment) => 
            <Row key={comment.id}>
              <Col md={12}>
                <div style={{
                  borderBottom: '1px solid #e4e6e8'
                }}>
                  <p style={{margin: '10px 0 15px'}}>
                    {comment.body} - <span style={{color: '#a0a0a0'}}>by {comment.author} at {convertDate(comment.timestamp)}</span></p>
                </div>
              </Col>
            </Row>)
          : null}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  postId: state.posts.selectedPostId,
  post: state.postDetail.detail,
  comments: state.postDetail.comments
});

const mapDispatchToProps = {
  fetchPostDetail
};

export default connect(mapStateToProps, mapDispatchToProps)(PostDetail);