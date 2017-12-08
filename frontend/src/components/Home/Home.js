import React, { Component } from 'react';
import { Row, Col, Nav, NavItem, Panel, Button, Glyphicon, Media } from 'react-bootstrap';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';

import CategoriesList from '../CategoriesList/CategoriesList';
import { _fetchPosts, _setSelectedPost, _postsListVote } from './actions';
import { convertDate, sortByDate, sortByScore } from '../../utils/helpers';
import { deletePost } from '../../utils/api';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      category: null,
      sort: true  // if true sort by date else sort by score
    };

    this.sortHandler = this.sortHandler.bind(this);
  }

  componentDidMount() {
    const { getPosts } = this.props;

    getPosts();
  }

  componentWillReceiveProps(props) {
    let { category } = props.match.params;
    
    this.setState({
      category
    });
  }

  sortHandler(key) {
    let sort = key === 'date' ? true : false;
    this.setState({ sort });
  }

  deleteHandler(postId) {
    const { getPosts } = this.props;

    deletePost(postId)
      .then(deleted => getPosts())
  }

  voteHandler(postId, e) {
    let { vote } = this.props

    vote(postId, e.target.id)
  }

  render() {
    let { category, sort } = this.state;
    let { setSelected } = this.props;

    let posts = !category ? this.props.posts : this.props.posts.filter((post) => post.category === category);

    sort ? posts.sort(sortByDate) : posts.sort(sortByScore);

    return (
      <Row>
        <Col md={8}>
          <div className='sort-tabs'>
            <Nav bsStyle="tabs" onSelect={this.sortHandler}>
              <NavItem active={sort} eventKey='date'>All</NavItem>
              <NavItem active={!sort} eventKey='score'>Top scorer</NavItem>
            </Nav>
          </div>
          <div>
            {posts && posts.length
              ? posts.sort().map((post) => (
                <Panel key={post.id}
                  footer={
                    <div>
                      <Link to={{
                        pathname: '/posts/create',
                        state: { post: post }
                      }} className='edit-btn'>Edit</Link>
                      <span style={{color: '#a0a0a0'}}> | </span>
                      <span onClick={() => this.deleteHandler(post.id)} className='edit-btn'>Delete</span>
                      <div className='post-footer'>
                        <span>
                          {convertDate(post.timestamp)} <strong>by</strong> {post.author}
                        </span>
                      </div>
                    </div>
                  }
                >
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
                      <h3 className='post-title'>
                        <Link 
                          onClick={() => setSelected(post.id)}
                          to={`/posts/${post.category}/${post.id}`}>
                          {post.title}
                        </Link>
                      </h3>
                      <div style={{ verticalAlign: 'bottom', marginTop: 20}}>
                        <span style={{display: 'inline'}} className='post-category'>
                          {post.category}
                        </span>
                        <div style={{ color: '#a0a0a0', display: 'inline', marginLeft: '10px', verticalAlign: 'middle' }}>
                          <Glyphicon glyph='comment' /> {post.commentsCount}
                        </div>
                      </div>
                    </Media.Body>
                  </Media>
                </Panel>
              ))
              : null
            }
          </div>
        </Col>
        <Col md={4}>
          <Link style={{textDecoration: 'none', color: 'white'}}
            to='/posts/create'>
            <Button className='add-post-btn' 
              bsSize="large" 
              bsStyle="success" 
              block
            >
              Create Post
            </Button>
          </Link>

          <CategoriesList />

        </Col>
      </Row>
    );
  }
}

let mapStateToProps = state => ({
  posts: state.posts.list
});

let mapDispatchToProps = dispatch => ({
  getPosts: () => dispatch(_fetchPosts()), 
  setSelected: (postId) => dispatch(_setSelectedPost(postId)),
  vote: (postId, vote) => dispatch(_postsListVote(postId, vote))
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Home));