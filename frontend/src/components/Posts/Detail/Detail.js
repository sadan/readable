import React, { Component } from 'react';
import { Row, Col, Clearfix, Media, Glyphicon } from 'react-bootstrap';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { _fetchPostDetail, _postVote } from './actions';
import { convertDate } from '../../../utils/helpers';
import { deletePost } from '../../../utils/api';
import CommentsList from '../Comment/List/CommentsList';
import CreateComment from '../Comment/Create/Create';
import { Redirect } from 'react-router-dom';

class PostDetail extends Component {
  constructor(props) {
    super(props);

    this.state = {
      deleted: false,
      exists: true,
      postId: null
    };

    this.voteHandler = this.voteHandler.bind(this);
    this.deleteHandler = this.deleteHandler.bind(this);
  }

  componentDidMount() {
    let { postId, _fetchPostDetail } = this.props;

    postId = postId ? postId : this.props.match.params.id;

    _fetchPostDetail(postId)
      .then((exists) => this.setState(() => ({ exists, postId })))
  }

  voteHandler(postId, e) {
    let { _postVote } = this.props;

    _postVote(postId, e.target.id);
  }
  
  deleteHandler(postId) {
    deletePost(postId)
      .then(deleted => this.setState({ deleted }));
  }

  render() {
    let { post, commentsCount } = this.props;
    let { deleted, exists, postId } = this.state;

    if(!postId) return null
    if(!exists) return <Redirect to='/404' />; 
    if(deleted) return <Redirect to='/' />;

    return (
      <div>
        <Row >
          <Col md={12}>
            <div className='divider'>
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
                <Col md={9} className='post'>
                  <Media>
                    <Media.Left style={{width: '8%'}}>
                      <div style={{display: 'inline-grid'}}>
                        <Glyphicon glyph='chevron-up'
                          className='vote-icon'
                          id='upVote'
                          onClick={e => this.voteHandler(post.id, e)} />
                        <span className='vote-score'>{post.voteScore}</span>
                        <Glyphicon glyph='chevron-down'
                          className='vote-icon' 
                          id='downVote'
                          onClick={e => this.voteHandler(post.id, e)}/>
                        </div>
                    </Media.Left>
                    <Media.Body>
                      <p>{post.body}</p>
                    </Media.Body>
                  </Media>
                </Col>
                <Col md={3}>
                  <p><span className='post-detail-heading'>Posted by</span> {post.author}</p>
                  <p><span className='post-detail-heading'>Posted at</span> {convertDate(post.timestamp)}</p>

                  <div style={{ verticalAlign: 'bottom', marginBottom: 10 }}>
                    <span style={{display: 'inline'}} className='post-category'>
                      {post.category}
                    </span>
                    <div style={{ color: '#a0a0a0', display: 'inline', marginLeft: '20px', verticalAlign: 'middle' }}>
                      <Glyphicon glyph='comment' /> {commentsCount}
                    </div>
                  </div>

                  <Link to={{
                    pathname: '/posts/create',
                    state: { post: post }
                  }} className='edit-btn'>Edit</Link>
                  <span style={{color: '#a0a0a0'}}> | </span>
                  <span onClick={() => this.deleteHandler(post.id)} className='edit-btn'>Delete</span>
                  <span style={{color: '#a0a0a0'}}> | </span>
                  <Link to={{
                    pathname: '/posts/create'
                  }} className='edit-btn'>New Post</Link>
                </Col>
              </Row>
            </div>
          </Col>
        </Row>
        <CreateComment postId={post.id} />
        <CommentsList postId={post.id} />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  postId: state.posts.selectedPostId,
  post: state.postDetail,
  commentsCount: state.postComments.length
});

const mapDispatchToProps = {
  _fetchPostDetail,
  _postVote
};

export default connect(mapStateToProps, mapDispatchToProps)(PostDetail);