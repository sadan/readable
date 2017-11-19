import React, { Component } from 'react';
import { Row, Col, Nav, NavItem, Panel, Button } from 'react-bootstrap';
import { connect } from 'react-redux';

import { fetchCategories } from './actions';
import CategoriesList from './CategoriesList';

class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
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
              <Panel footer="Votes: 18">
                How would you like to read react?
              </Panel>
              <Panel footer="Votes: 9">
                What do you want from me?
              </Panel>
              <Panel footer="Votes: -4">
                What do you mean?
              </Panel>
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
  fetchCategories
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);