import React, { Component } from 'react';

import { Navbar, Grid, Row, Col, Nav, NavItem, Panel, Button } from 'react-bootstrap';

class App extends Component {
  render() {
    return (
      <div>
        <Navbar>
          <Navbar.Header>
            <Navbar.Brand>
              <a href="#">Readable</a>
            </Navbar.Brand>
          </Navbar.Header>
        </Navbar>

        <Grid>
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
              <div style={{
                padding: '15px 15px 10px',
                backgroundColor: '#fff8dc',
                border: '1px solid #e0dcbf',
                fontSize: '13px', lineHeight: 1.3
              }}>
                <div style={{ 
                  fontWeight: 'bold',
                  fontSize: '11px',
                  color: '#9c988b',
                  textTransform: 'uppercase',
                  marginBottom: '10px',
                  lineHeight: 1.8,
                  borderBottom: '1px solid #e0dcbf'
                }}>Categories</div>
              </div>
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}

export default App;
