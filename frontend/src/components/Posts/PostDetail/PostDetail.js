import React, { Component } from 'react';
import { Row, Col } from 'react-bootstrap';
import { connect } from 'react-redux';

import { fetchPostDetail } from './actions';
import { convertDate } from '../../utils';

class PostDetail extends Component {
  componentDidMount() {
    let { postId, fetchPostDetail } = this.props;

    postId = postId ? postId : this.props.match.params.id;

    fetchPostDetail(postId);
  }

  render() {
    let {post, comments} = this.props;
    console.log(comments)

    return (
      <div>
        <Row>
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
          <Col md={9}>
            {post.body}
          </Col>
          <Col md={3}>
            <div>
              Posted by: {post.author}
            </div>
            <div>
              Posted at: {convertDate(post.timestamp)}
            </div>
            <span className='post-category'>
              {post.category}
            </span>
          </Col>
        </Row>
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