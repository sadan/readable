import React, { Component } from 'react';
import { Row, Col, Nav, NavItem, Panel, Button } from 'react-bootstrap';
import { connect } from 'react-redux';

import CategoriesList from './CategoriesList/CategoriesList';
import { fetchPosts } from './actions';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      category: null,
      sort: true  // if true sort by date else sort by score
    };

    this.sortHandler = this.sortHandler.bind(this);
    this.sortByDate = this.sortByDate.bind(this);
    this.sortByScore = this.sortByScore.bind(this);
  }

  componentDidMount() {
    const { fetchPosts } = this.props;

    fetchPosts();
  }

  componentWillReceiveProps(props) {
    let { category } = props.match.params;
    
    this.setState({
      category
    });
  }

  convertDate(timestamp) {
    let options = {
      weekday: 'long',
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    };
    return new Date(timestamp).toLocaleDateString("en-US", options);
  }

  sortHandler(key) {
    let sort = key === 'date' ? true : false;
    this.setState({ sort });
  }
  
  sortByDate(a, b) {
    return (new Date(b.timestamp) - new Date(a.timestamp));
  }

  sortByScore(a, b) {
    return b.voteScore - a.voteScore;
  }

  render() {
    let { category, sort } = this.state;
    let posts = !category ? this.props.posts : this.props.posts.filter((post) => post.category === category);

    sort ? posts.sort(this.sortByDate) : posts.sort(this.sortByScore)
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
                          <strong>created at</strong> {this.convertDate(post.timestamp)} <strong>by</strong> {post.author}
                        </span>
                      </div>
                    </div>
                  }>
                    <p className='post-title'>{post.title}</p>
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
          <Button className='add-post-btn' 
            bsSize="large" 
            bsStyle="success" 
            block>
            Add Post
          </Button>
          <CategoriesList />
        </Col>
      </Row>
    );
  }
}

let mapStateToProps = state => ({
  posts: state.posts
});

let mapDispatchToProps = {
  fetchPosts
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);