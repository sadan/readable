import React, { Component } from 'react';
import { Row, Col, Nav, NavItem, Panel, Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';

import CategoriesList from '../CategoriesList/CategoriesList';
import { getPosts, setSelectedPost } from './actions';
import { convertDate, sortByDate, sortByScore } from '../../utils/helpers';

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
                      <span>Votes: {post.voteScore}</span>
                      <div className='post-footer'>
                        <span>
                          <strong>created at</strong> {convertDate(post.timestamp)} <strong>by</strong> {post.author}
                        </span>
                      </div>
                    </div>
                  }
                >
                  <h3 className='post-title'>
                    <Link 
                      onClick={() => setSelected(post.id)}
                      to={`/posts/${post.category}/${post.id}`}>
                      {post.title}
                    </Link>
                  </h3>
                  <span className='post-category'>
                    {post.category}
                  </span>
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
  getPosts: () => dispatch(getPosts()), 
  setSelected: (postId) => dispatch(setSelectedPost(postId))
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Home));