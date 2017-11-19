import React, { Component } from 'react';
import { Row, Col, Nav, NavItem, Panel, Button } from 'react-bootstrap';
import { connect } from 'react-redux';

import CategoriesList from './CategoriesList/CategoriesList';
import { fetchPosts } from './actions';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      category: null
    };
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

  render() {
    let { category } = this.state;
    let posts = !category ? this.props.posts : this.props.posts.filter((post) => post.category === category);

    return (
      <div>
        <Row>
          <Col md={8}>
            <div style={{marginBottom: '20px'}}>
              <Nav bsStyle="tabs">
                <NavItem active>All</NavItem>
                <NavItem>Newest</NavItem>
                <NavItem>Top</NavItem>
              </Nav>
            </div>
            <div>
              {posts && posts.length
                ? posts.map((post) => (
                  <Panel key={post.id}
                    footer={
                      <div>
                        <span>Votes: {post.voteScore}</span>
                        <div style={{float: 'right', color: '#999999'}}>
                          <span>
                            <strong>created at</strong> {this.convertDate(post.timestamp)} <strong>by</strong> {post.author}
                          </span>
                        </div>
                      </div>
                    }>
                      <p style={{fontSize: '16px'}}>{post.title}</p>
                    <span style={{
                      padding: '3px 5px', 
                      backgroundColor: '#5fba7d',
                      display: 'table',
                      color: '#fff'
                    }}>
                      {post.category}
                    </span>
                  </Panel>
                ))
                : null
              }
            </div>
          </Col>
          <Col md={4}>
            <Button bsSize="large" bsStyle="success" block style={{ marginBottom: '20px'}}>
              Add Post
            </Button>
            <CategoriesList />
          </Col>
        </Row>
      </div>
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